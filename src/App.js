import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import styled from 'styled-components/macro'
import GlobalStyle from './common/GlobalStyle'
import Footer from './components/Footer'
import Header from './components/Header'
import SpeechesList from './components/Video/SpeechesList'
import Speech from './components/Video/Speech'
import { getVideos } from './services/videoServices'

function App() {
  const [videos, setVideos] = useState([])
  const [video, setVideo] = useState({})
  const videoBasePath = '/videos/'

  useEffect(() => {
    getVideos().then(res => {
      return setVideos(res)
    })
  }, [])
  console.log('videos:', videos)
  console.log('video:', video)
  return (
    <AppBodyStyled>
      <GlobalStyle />
      <Header />
      <Router>
        <Switch>
          <Route exact path="/">
            <SpeechesList
              speeches={videos}
              setSpeech={setVideo}
              videoBasePath={videoBasePath}
            />
          </Route>
          <Route exact path="/video/:id">
            <Speech
              speech={video}
              setSpeech={setVideo}
              videoBasePath={videoBasePath}
            />
          </Route>
        </Switch>
      </Router>
      <Footer />
    </AppBodyStyled>
  )
}

export default App

const AppBodyStyled = styled.div`
  display: grid;
  grid-template: 72px auto 60px / 1fr;
  width: 100vw;
  height: 100vh;
`
