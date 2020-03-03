import React, { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import styled from 'styled-components/macro'
import { getVideos, patchVideo } from '../services/videoServices'

export default function Video({ videoBasePath, video, setVideo }) {
  let { id } = useParams()
  const [gestureAndPosture, setGestureAndPosture] = useState(3)
  const [mimicAndExpression, setMimicAndExpression] = useState(3)
  const [useOfStage, setUseOfStage] = useState(3)
  const [pronounciationAndClarity, setPronounciationAndClarity] = useState(3)
  const [emphasisAndVocalVariety, setEmphasisAndVocalVariety] = useState(3)
  const [comprehensibility, setComprehensibility] = useState(3)
  const [structureAndArgumentation, setStructureAndArgumentation] = useState(3)
  const [rangeOfStatement, setRangeOfStatement] = useState(3)
  useEffect(() => {
    Object.entries(video).length === 0 &&
      getVideos(id).then(res => {
        setVideo(res)
        checkHasEvaluationProperty(res, 'gestureAndPosture') &&
          setGestureAndPosture(res.evaluation.gestureAndPosture)
        checkHasEvaluationProperty(res, 'mimicAndExpression') &&
          setMimicAndExpression(res.evaluation.mimicAndExpression)
        checkHasEvaluationProperty(res, 'useOfStage') &&
          setUseOfStage(res.evaluation.useOfStage)
        checkHasEvaluationProperty(res, 'pronounciationAndClarity') &&
          setPronounciationAndClarity(res.evaluation.pronounciationAndClarity)
        checkHasEvaluationProperty(res, 'emphasisAndVocalVariety') &&
          setEmphasisAndVocalVariety(res.evaluation.emphasisAndVocalVariety)
        checkHasEvaluationProperty(res, 'comprehensibility') &&
          setComprehensibility(res.evaluation.comprehensibility)
        checkHasEvaluationProperty(res, 'structureAndArgumentation') &&
          setStructureAndArgumentation(res.evaluation.structureAndArgumentation)
        checkHasEvaluationProperty(res, 'rangeOfStatement') &&
          setRangeOfStatement(res.evaluation.rangeOfStatement)
      })
  }, [])
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
        <label htmlFor="mimicAndExpression">
          Mimic and Emotional Expression
          <input
            onChange={event => handleSliderChange(event, setMimicAndExpression)}
            type="range"
            value={mimicAndExpression}
            min="1"
            max="5"
            step="1"
            name="mimicAndExpression"
            id="mimicAndExpression"
          />
        </label>
        <label htmlFor="useOfStage">
          Use of Stage
          <input
            onChange={event => handleSliderChange(event, setUseOfStage)}
            type="range"
            value={useOfStage}
            min="1"
            max="5"
            step="1"
            name="useOfStage"
            id="useOfStage"
          />
        </label>
        <label htmlFor="pronounciationAndClarity">
          Pronounciation and Voice Clarity
          <input
            onChange={event =>
              handleSliderChange(event, setPronounciationAndClarity)
            }
            type="range"
            value={pronounciationAndClarity}
            min="1"
            max="5"
            step="1"
            name="pronounciationAndClarity"
            id="pronounciationAndClarity"
          />
        </label>
        <label htmlFor="emphasisAndVocalVariety">
          Emphasis and Vocal Variety
          <input
            onChange={event =>
              handleSliderChange(event, setEmphasisAndVocalVariety)
            }
            type="range"
            value={emphasisAndVocalVariety}
            min="1"
            max="5"
            step="1"
            name="emphasisAndVocalVariety"
            id="emphasisAndVocalVariety"
          />
        </label>
        <label htmlFor="comprehensibility">
          Comprehensibility of Content
          <input
            onChange={event => handleSliderChange(event, setComprehensibility)}
            type="range"
            value={comprehensibility}
            min="1"
            max="5"
            step="1"
            name="comprehensibility"
            id="comprehensibility"
          />
        </label>
        <label htmlFor="structureAndArgumentation">
          Structure and Argumentation
          <input
            onChange={event =>
              handleSliderChange(event, setStructureAndArgumentation)
            }
            type="range"
            value={structureAndArgumentation}
            min="1"
            max="5"
            step="1"
            name="structureAndArgumentation"
            id="structureAndArgumentation"
          />
        </label>
        <label htmlFor="rangeOfStatement">
          Range of Statement
          <input
            onChange={event => handleSliderChange(event, setRangeOfStatement)}
            type="range"
            value={rangeOfStatement}
            min="1"
            max="5"
            step="1"
            name="rangeOfStatement"
            id="rangeOfStatement"
          />
        </label>

        {/* 
        , 
        , 
        range of the statement */}
        <button type="submit">Submit</button>
      </VideoEvaluation>
    </>
  )
  function handleSubmit(event) {
    event.preventDefault()
    alert('form submitted')
    patchVideo(id, video)
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
    }
  }
  function checkHasEvaluationProperty(object, property) {
    console.log(property)
    return (
      object.hasOwnProperty('evaluation') &&
      object.evaluation.hasOwnProperty(property)
    )
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
