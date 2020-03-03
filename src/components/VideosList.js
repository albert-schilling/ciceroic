import React from 'react'
import styled from 'styled-components/macro'

export default function VideosList({ videos }) {
  const videoBasePath = '/videos/'

  return (
    <VideosListStyled>
      {videos.map(video => {
        return (
          <VideoCard key={video.id} role="region">
            <VideoCardVideo role="img" controls>
              <source src={videoBasePath + video.filename} type="video/mp4" />
            </VideoCardVideo>
            <VideoCardBody>
              <header>
                <h2>{video.title}</h2>
              </header>
              <h3>{video.speaker}</h3>
              <VideoCardDescription>{video.description}</VideoCardDescription>
              <VideoCardDetails>
                <small>{video.category}</small>
                <small>{video.duration} min</small>
                <small>{video.date}</small>
              </VideoCardDetails>
            </VideoCardBody>
          </VideoCard>
        )
      })}
    </VideosListStyled>
  )
}

const VideosListStyled = styled.section`
  display: grid;
  grid-gap: 8px;
  @media (min-width: 700px) {
    display: flex;
    flex-wrap: wrap;
  }
`
const VideoCard = styled.article`
  background: #ffffff;
  border: 1px solid #eee;
  border-radius: 4px;
  padding: 12px;
  h2 {
    font-size: 1.2rem;
    line-height: 1.6rem;
  }
  h3 {
    font-size: 1rem;
  }
  @media (min-width: 700px) {
    width: calc(50% - 4px);
  }
`

const VideoCardVideo = styled.video`
  width: 100%;
  height: auto;
`

const VideoCardDescription = styled.p`
  line-height: 1.4rem;
`

const VideoCardDetails = styled.p`
  display: flex;
  justify-content: space-between;
  grid-gap: 4px;
  color: var(--secondary-font-color);
  margin-bottom: 0;
`

const VideoCardBody = styled.section``
