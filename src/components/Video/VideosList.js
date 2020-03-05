import React from 'react'
import styled from 'styled-components/macro'
import { NavLink } from 'react-router-dom'

export default function VideosList({ videos, setVideo, videoBasePath }) {
  return (
    <Main>
      <VideosListStyled>
        {videos.map(video => {
          return (
            <VideoCard key={video.id} role="region">
              {video.filename === undefined ? (
                <p>Video loading</p>
              ) : (
                <VideoCardVideo role="img" controls>
                  <source
                    src={videoBasePath + video.filename}
                    type="video/mp4"
                  />
                </VideoCardVideo>
              )}
              {/* <VideoCardVideo role="img" controls>
                <source src={videoBasePath + video.filename} type="video/mp4" />
              </VideoCardVideo> */}
              <VideoCardInformation>
                <header>
                  <VideoCardHeadline>{video.title}</VideoCardHeadline>
                </header>
                <VideoCardSpeaker>{video.speaker}</VideoCardSpeaker>
                <VideoCardDescription>{video.description}</VideoCardDescription>
                <VideoCardDetails>
                  <small>{video.category}</small>
                  <small>{video.duration} min</small>
                  <small>{video.date}</small>
                </VideoCardDetails>
                <VideoEvaluateButton
                  onClick={() => setVideo(video)}
                  to={'/video/' + video.id}
                >
                  Evaluate
                </VideoEvaluateButton>
              </VideoCardInformation>
            </VideoCard>
          )
        })}
      </VideosListStyled>
    </Main>
  )
}

const Main = styled.main`
  padding: 20px;
  height: 100%;
  overflow-y: scroll;
`

const VideosListStyled = styled.section`
  margin-bottom: 20px;
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

  @media (min-width: 700px) {
    width: calc(50% - 4px);
  }
`

const VideoCardVideo = styled.video`
  width: 100%;
  height: auto;
`
const VideoCardInformation = styled.section`
  display: flex;
  flex-direction: column;
`
const VideoCardHeadline = styled.h2`
  margin: 12px 0;
  font-size: 1.2rem;
  line-height: 1.6rem;
`
const VideoCardSpeaker = styled.h2`
  margin: 0 0 16px 0;
  font-size: 1rem;
`

const VideoCardDescription = styled.p`
  margin: 0;
  line-height: 1.4rem;
`

const VideoCardDetails = styled.p`
  display: flex;
  justify-content: space-between;
  grid-gap: 4px;
  color: var(--secondary-font-color);
  margin-bottom: 0;
`

const VideoEvaluateButton = styled(NavLink)`
  margin: 16px 0 4px 0;
  align-self: center;
  width: max-content;
  padding: 8px;
  background: var(--primary-bg-color);
  text-align: center;
  color: var(--inverse-primary-font-color);
  text-decoration: none;
`
