import React from 'react'
import styled from 'styled-components/macro'
import { NavLink } from 'react-router-dom'

export default function VideosList({ videos, setVideo, videoBasePath }) {
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
                <VideoCardHeadline>{video.title}</VideoCardHeadline>
              </header>
              <h3>{video.speaker}</h3>
              <VideoCardDescription>{video.description}</VideoCardDescription>
              <VideoCardDetails>
                <small>{video.category}</small>
                <small>{video.duration} min</small>
                <small>{video.date}</small>
              </VideoCardDetails>
              <NavLink
                onClick={() => setVideo(video)}
                to={'/video/' + video.id}
              >
                Evaluate
              </NavLink>
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

  h3 {
    font-size: 1rem;
  }
  @media (min-width: 700px) {
    width: calc(50% - 4px);
  }
`
const VideoCardHeadline = styled.h2`
  font-size: 1.2rem;
  line-height: 1.6rem;
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
