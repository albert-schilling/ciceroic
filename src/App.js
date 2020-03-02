import React, { useEffect, useState } from 'react'
import GlobalStyle from './common/GlobalStyle'
import VideosList from './components/VideosList'
import { getVideos } from './services/videoServices'
import styled from 'styled-components/macro'
import Header from './components/Header'
import Footer from './components/Footer'

function App() {
  const [videos, setVideos] = useState([])

  useEffect(() => {
    getVideos().then(res => setVideos(res))
  }, [])
  return (
    <AppBodyStyled>
      <GlobalStyle />
      <Header />
      <Main>
        <VideosList videos={videos} />
      </Main>
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
