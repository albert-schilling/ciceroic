import React, { useEffect, useState, useRef } from 'react'
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

  const inputFirstNameRef = useRef(null)
  const inputLastNameRef = useRef(null)

  const [message, setMessage] = useState({
    visible: 'none',
    text: '',
    buttonRef: useRef(null),
    confirmHandler: () => {},
    focusRef: inputFirstNameRef.current,
  })

  // const [message, setMessage] = useState('')
  // const [messageReturnFocus, setMessageReturnFocus] = useState(
  //   inputFirstNameRef.current
  // )
  // const [messageVisibility, setMessageVisibility] = useState('none')
  // const messageButtonRef = useRef(null)

  useEffect(() => {
    Object.entries(video).length === 0 &&
      getVideos(id).then(res => {
        setVideo(res)
      })
    inputFirstNameRef.current.focus()
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
        inputFirstNameRef={inputFirstNameRef}
        inputLastNameRef={inputLastNameRef}
      />
      <UserMessage
        message={message}
        setMessage={setMessage}

        // visibility={messageVisibility}
        // setVisibility={setMessageVisibility}
        // returnPath={returnPath}
        // messageCallback={messageCallback}
        // messageReturnFocus={messageReturnFocus}
        // clickHandler={focusTextInputField}
        // messageButtonRef={messageButtonRef}
      />
    </Main>
  )
  function handleSubmit(event) {
    event.preventDefault()
    console.log('message:', message)
    console.log('message.buttonRef:', message.buttonRef)
    message.buttonRef.current.focus()

    const fullName = `${evaluation.evaluator.firstName} ${evaluation.evaluator.lastName}`

    const firstNameMissing = evaluation.evaluator.firstName.length === 0

    if (firstNameMissing) {
      setMessage({
        ...message,
        visible: 'flex',
        text: 'Please, fill out your first name.',
        confirmHandler: focusTextInputField,
        focusRef: inputFirstNameRef,
      })
      return
    }

    const lastNameMissing = evaluation.evaluator.lastName.length === 0

    if (lastNameMissing) {
      setMessage({
        ...message,
        visible: 'flex',
        text: 'Please, fill out your last name.',
        confirmHandler: focusTextInputField,
        focusRef: inputLastNameRef,
      })
      return
    }

    const foundEvaluator = searchEvaluator(
      fullName.toLowerCase(),
      video.evaluations
    )

    if (foundEvaluator) {
      setMessage({
        ...message,
        visible: 'flex',
        text: `Sorry, ${fullName},
        you have already evaluated this speech.`,
        confirmHandler: focusTextInputField,
        focusRef: inputFirstNameRef,
      })

      return
    }

    updateEvaluation()
    resetEvaluation()
    setMessage({
      ...message,
      visible: 'flex',
      text: `Thank you ${fullName}. 
      Your evaluation has been submitted.`,
      confirmHandler: focusTextInputField,
      focusRef: inputFirstNameRef,
    })
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
  function focusTextInputField(ref) {
    ref.current.focus()
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
