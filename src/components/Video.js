import React, { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import styled from 'styled-components/macro'
import { getVideos } from '../services/videoServices'

export default function Video({ videoBasePath, video, setVideo }) {
  let { id } = useParams()
  const [gestureAndPosture, setGestureAndPosture] = useState(3)
  useEffect(() => {
    Object.entries(video).length === 0 &&
      getVideos(id).then(res => setVideo(res))
  }, [])
  console.log(video.evaluation)
  console.log(video)
  return (
    <>
      <NavLink exact to="/">
        back
      </NavLink>
      <VideoStyled role="img" controls>
        <source src={videoBasePath + video.filename} type="video/mp4" />
      </VideoStyled>
      <VideoInformation>
        <header>
          <VideoTitle>{video.title}</VideoTitle>
        </header>
        <h3>{video.speaker}</h3>
        <VideoDescription>{video.description}</VideoDescription>
        <VideoDetails>
          <small>{video.category}</small>
          <small>{video.duration} min</small>
          <small>{video.date}</small>
        </VideoDetails>
      </VideoInformation>
      <VideoEvaluation onSubmit={handleSubmit}>
        <label htmlFor="firstName">
          First Name
          <input type="text" name="firstName" id="firstName" />
        </label>

        <label htmlFor="lastName">
          Last Name
          <input type="text" name="lastName" id="lastName" />
        </label>
        <label htmlFor="gestureAndPosture">
          Gesture and Posture
          <input
            onChange={event => handleSliderChange(event, setGestureAndPosture)}
            type="range"
            value={gestureAndPosture}
            min="1"
            max="5"
            step="1"
            name="gestureAndPosture"
            id="gestureAndPosture"
          />
        </label>

        {/* gesture and posture, 
        mimic and emotional expression, 
        use of stage/positioning, 
        pronounciation and voice clarity, 
        emphasis and vocal variety, 
        comprehensibility of content, 
        structure and argumentation, 
        range of the statement */}
      </VideoEvaluation>
    </>
  )
  function handleSubmit(event) {
    event.preventDefault()
    alert('form submitted')
  }
  function handleSliderChange(event, inputValueSetter) {
    inputValueSetter(event.target.value)
    video.hasOwnProperty('evaluation')
      ? addEvaluation(event.target.name, event.target.value)
      : console.log('does not have evaluation key')

    function addEvaluation(key, value) {
      Object.assign(video.evaluation, {
        [key]: value,
      })

      setVideo(video)
      console.log('video after addEvaluation', video)
      console.log('gestureAndPosture', video.evaluation.gestureAndPosture)
    }
  }
}

const VideoTitle = styled.h2`
  font-size: 1.2rem;
  line-height: 1.6rem;
`

const VideoInformation = styled.section`
  h3 {
    font-size: 1rem;
  }
`

const VideoStyled = styled.video`
  width: 100%;
  height: auto;
`

const VideoDescription = styled.p`
  line-height: 1.4rem;
`

const VideoDetails = styled.p`
  display: flex;
  justify-content: space-between;
  grid-gap: 4px;
  color: var(--secondary-font-color);
  margin-bottom: 0;
`

const VideoEvaluation = styled.form`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  grid-gap: 20px;
  margin: 20px 0;
  label {
    display: grid;
    grid-template: auto auto / 1fr;
    /* width: calc(50% - 8px); */
    width: 100%;
    grid-gap: 8px;
  }

  input[type='text'] {
    font-size: 1rem;
    width: 100%;
  }
  input[type='range'] {
    width: 100%;
  }
`
