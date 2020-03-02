import React from 'react'
import styled from 'styled-components/macro'

export default function VideosList({ videos }) {
  const resPath =
    'file:///Users/albertschilling/Projects/capstone-project/videos/'

  return (
    <>
      {videos.map(video => {
        // import videoUrl from `${resPath} + ${video.filename}`
        return (
          <VideoCardStyled key={videos.id}>
            <video width="200px" height="200px">
              <source src={resPath + video.filename} type="video/mp4" />
            </video>
            <img
              width="200px"
              height="200px"
              src="file:///Users/albertschilling/Projects/capstone-project/videos/grapefruit-slice-332-332.jpg"
              alt=""
            />
            <header>{video.title}</header>
            <h3>{video.speaker}</h3>
            <p>
              {video.description}
              <small>{video.category}</small>
              <small>{video.duration}</small>
              <small>{video.date}</small>
            </p>
          </VideoCardStyled>
        )
      })}
    </>
  )
}

const VideoCardStyled = styled.article`
  border: 1px solid black;
`
