import React, { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import styled from 'styled-components/macro'
import { evaluationDimensions } from '../../data/evaluationDimensions'
import { getVideos, patchVideo } from '../../services/videoServices'
import UserMessage from '../UserMessage'
import VideoEvaluationForm from './VideoEvaluationForm'

export default function Video({ videoBasePath, video, setVideo }) {
  let { id } = useParams()
  const returnPath = `/video/${id}`

  const initialDimensionsValues = returnInitialDimenstionsValues(
    evaluationDimensions
  )
  const [evaluation, setEvaluation] = useState({
    dimensions: { ...initialDimensionsValues },
    evaluator: { firstName: '', lastName: '' },
    date: '',
  })

  const [message, setMessage] = useState('')
  const [messageCallback, setMessageCallback] = useState(() => {})
  const [messageVisibility, setMessageVisibility] = useState('none')

  useEffect(() => {
    Object.entries(video).length === 0 &&
      getVideos(id).then(res => {
        setVideo(res)
      })
  }, [video, setVideo, id])

  return (
    <Main>
      <NavLinkStyled exact to="/">
        <span>&#8612;</span>see all videos
      </NavLinkStyled>
      {video.filename === undefined ? (
        <p>Video loading</p>
      ) : (
        <VideoStyled role="img" controls>
          <source src={videoBasePath + video.filename} type="video/mp4" />
        </VideoStyled>
      )}
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
      <VideoEvaluationForm
        evaluation={evaluation}
        setEvaluation={setEvaluation}
        handleSubmit={handleSubmit}
      />
      <UserMessage
        message={message}
        visibility={messageVisibility}
        setVisibility={setMessageVisibility}
        returnPath={returnPath}
        messageCallback={messageCallback}
      />
    </Main>
  )
  function handleSubmit(event) {
    event.preventDefault()

    const form = event.target
    const fullName = `${evaluation.evaluator.firstName} ${evaluation.evaluator.lastName}`

    const firstNameMissing = evaluation.evaluator.firstName.length === 0
    if (firstNameMissing) {
      const setFocus = () => {
        form.firstName.focus()
      }
      setMessageCallback(setFocus)
      setMessage(`Please, fill out your first name.`)
      setMessageVisibility('flex')
      return
    }
    const lastNameMissing = evaluation.evaluator.lastName.length === 0
    if (lastNameMissing)
      if (evaluation.evaluator.lastName.length === 0) {
        const setFocus = () => {
          form.lastName.focus()
        }
        setMessageCallback(setFocus)
        setMessage(`Please, fill out your last name.`)
        setMessageVisibility('flex')
        return
      }

    const foundEvaluator = searchEvaluator(
      fullName.toLowerCase(),
      video.evaluations
    )

    if (foundEvaluator) {
      const setFocus = () => {
        form.firstName.focus()
      }
      setMessageCallback(setFocus)
      setMessage(`Sorry, ${fullName}, you have already evaluated this speech.`)

      setMessageVisibility('flex')
      return
    }

    updateEvaluation()
    resetEvaluation()
    setMessageVisibility('flex')
    setMessage(`Thank you ${fullName}. Your evaluation has been submitted.`)
  }

  function updateEvaluation() {
    Object.assign(evaluation, { date: new Date().getTime() })
    video.evaluations.push(evaluation)
    setVideo(video)
    patchVideo(id, video)
  }
  function resetEvaluation() {
    setEvaluation({
      dimensions: { ...initialDimensionsValues },
      evaluator: { firstName: '', lastName: '' },
      date: '',
    })
  }

  function searchEvaluator(newFullName, evaluations) {
    return evaluations.some(storedEvaluation => {
      const storedFullName = `${storedEvaluation.evaluator.firstName} ${storedEvaluation.evaluator.lastName}`.toLowerCase()
      return storedFullName === newFullName
    })
  }

  function returnInitialDimenstionsValues(evaluationDimensions) {
    const values = {}
    evaluationDimensions.map(dimension =>
      Object.assign(values, { [dimension.name]: 3 })
    )
    return values
  }
}

const Main = styled.main`
  background: #fff;
  padding: 20px;
  height: 100%;
  overflow-y: scroll;
  @media (min-width: 700px) {
    display: grid;
    grid-template-areas: 'backLink backLink' 'video information' 'evaluation evaluation';
    grid-gap: 12px;
  }
`

const NavLinkStyled = styled(NavLink)`
  grid-area: backLink;
  width: fit-content;
  padding: 4px 4px 4px 4px;
  background: var(--light-grey);
  color: inherit;
  text-decoration: none;
  font-size: 0.6rem;
  span {
    padding-top: 4px;
    margin-right: 4px;
    color: var(--highlight-color);

    font-size: 1rem;
    font-weight: 900;
  }
`
const VideoTitle = styled.h2`
  font-size: 1.2rem;
  line-height: 1.6rem;
`

const VideoInformation = styled.section`
  grid-area: information;
  h3 {
    font-size: 1rem;
  }
`

const VideoStyled = styled.video`
  width: 100%;
  height: auto;
  margin-top: 12px;
  grid-area: video;
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
