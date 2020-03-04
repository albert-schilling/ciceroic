import React, { useEffect, useState, forceUpdate } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import styled from 'styled-components/macro'
import { getVideos, patchVideo } from '../services/videoServices'
import VideoEvaluationInputRange from './VideoEvaluationInputRange'
import UserMessage from './UserMessage'

export default function Video({ videoBasePath, video, setVideo }) {
  let { id } = useParams()
  const returnPath = '/video/:id'
  const evaluationDimensions = [
    { name: 'Gestures And Facial Expressions', value: 3 },
    { name: 'Pronounciation and Vocal Variety', value: 3 },
    { name: 'Comprehensibility and Structure', value: 3 },
    { name: 'Stylistic Devices', value: 3 },
    { name: 'Credible and Convincing', value: 3 },
  ]
  const [message, setMessage] = useState('')
  const [messageVisibility, setMessageVisibility] = useState('none')
  useEffect(() => {
    Object.entries(video).length === 0 &&
      getVideos(id).then(res => {
        setVideo(res)
      })
  }, [])
  return (
    <Main>
      <NavLinkStyled exact to="/">
        &#8612;
      </NavLinkStyled>
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
        {evaluationDimensions.map(dimension => {
          return (
            <VideoEvaluationInputRange
              key={dimension.name}
              name={dimension.name}
            />
          )
        })}
        <VideoEvaluationSubmit type="submit">Submit</VideoEvaluationSubmit>
      </VideoEvaluation>
      <UserMessage
        message={message}
        visibility={messageVisibility}
        setVisibility={setMessageVisibility}
        returnPath={returnPath}
      />
    </Main>
  )
  function handleSubmit(event) {
    event.preventDefault()

    const form = event.target
    const fullName = `${form.firstName.value} ${form.lastName.value}`

    if (form.firstName.value.length === 0) {
      alert('Please, fill out your first name.')
      form.firstName.focus()
      return
    }
    if (form.lastName.value.length === 0) {
      alert('Please, fill out your last name.')
      form.lastName.focus()
      return
    }
    if (
      video.hasOwnProperty('evaluations') &&
      video.evaluations.find(
        evaluation =>
          evaluation.evaluator.toLowerCase() === fullName.toLowerCase()
      )
    ) {
      alert(
        `Thank you for your ambition, ${fullName}, but you have already evaluated this speech.`
      )
      return
    }
    alert(`Thank you ${fullName}. Your evaluation has been submitted.`)
    setEvaluation(event)
    form.reset()
    setMessageVisibility('flex')
    setMessage(`Thank you ${fullName}. Your evaluation has been submitted.`)
  }

  function setEvaluation(event) {
    video.hasOwnProperty('evaluations')
      ? console.log(video.evaluations)
      : Object.assign(video, { evaluations: [] })
    const evaluator = `${event.target.firstName.value} ${event.target.lastName.value}`
    const newEvaluation = {
      evaluator,
      date: new Date().getTime(),
      dimensions: [],
    }
    evaluationDimensions.map(dimension =>
      newEvaluation.dimensions.push({
        name: dimension.name,
        value: dimension.value,
      })
    )
    video.evaluations.push(newEvaluation)
    setVideo(video)
    patchVideo(id, video)
  }
}

const Main = styled.main`
  background: #fff;
  padding: 20px;
  height: 100%;
  overflow-y: scroll;
`

const NavLinkStyled = styled(NavLink)`
  background: var(--light-grey);
  text-decoration: none;
  padding: 0 4px 4px 4px;
  color: var(--highlight-color);

  font-weight: 900;
`
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
  margin-top: 12px;
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
  justify-content: center;
  grid-gap: 20px;
  margin: 20px 0;
  label {
    display: grid;
    grid-template: auto auto auto / 1fr;
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

const VideoEvaluationSubmit = styled.button`
  margin: 16px 0 4px 0;
  align-self: center;
  width: max-content;
  border: none;
  padding: 8px;
  background: var(--primary-bg-color);
  text-align: center;
  font-size: 1rem;
  color: var(--inverse-primary-font-color);
  text-decoration: none;
`
