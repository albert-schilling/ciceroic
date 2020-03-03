import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import styled from 'styled-components/macro'
import GlobalStyle from './common/GlobalStyle'
import Footer from './components/Footer'
import Header from './components/Header'
import VideosList from './components/VideosList'
// import Video from './components/Video'
import { getVideos } from './services/videoServices'

function App() {
  const [videos, setVideos] = useState([])

  useEffect(() => {
    getVideos().then(res => {
      console.log(res)
      return setVideos(res)
    })
  }, [])

  return (
    <AppBodyStyled>
      <GlobalStyle />
      <Header />
      <Router>
        <Main>
          <Switch>
            <Route exact path="/">
              <VideosList videos={videos} />
            </Route>
            {/* <Route exact path="/video">
              <Video videos={videos} />
            </Route> */}
          </Switch>
        </Main>
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
const Main = styled.main`
  padding: 20px;
  height: 100%;
  overflow-y: scroll;
`
