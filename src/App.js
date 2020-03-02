import React, { useEffect, useState } from 'react'
import GlobalStyle from './components/GlobalStyle'
import VideosList from './components/VideosList'
import { getVideos } from './services/videoServices'

function App() {
  const [videos, setVideos] = useState([])

  useEffect(() => {
    getVideos().then(res => setVideos(res))
  }, [])
  return (
    <>
      <GlobalStyle />
      <h1>React Boilerplate with styled-components</h1>
      <VideosList videos={videos} />
    </>
  )
}

export default App
