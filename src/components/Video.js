import React, { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import styled from 'styled-components/macro'
import { evaluationDimensions } from '../data/evaluationDimensions'
import { getVideos, patchVideo } from '../services/videoServices'
import UserMessage from './UserMessage'
import VideoEvaluationComp from './VideoEvaluation'

export default function Video({ videoBasePath, video, setVideo }) {
  let { id } = useParams()
  const returnPath = `/video/${id}`

  const initialDimensionsValues = {}
  setInitialDimenstionsValues()
  const [dimensionsValues, setDimensionsValues] = useState(
    initialDimensionsValues
  )

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
      <VideoEvaluationComp
        video={Video}
        setVideo={setVideo}
        id={id}
        dimensionsValues={dimensionsValues}
        setDimensionsValues={setDimensionsValues}
        initialDimensionsValues={initialDimensionsValues}
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
    const fullName = `${form.firstName.value} ${form.lastName.value}`

    if (form.firstName.value.length === 0) {
      const setFocus = () => {
        form.firstName.focus()
      }
      setMessageCallback(setFocus)
      setMessage(`Please, fill out your first name.`)
      setMessageVisibility('flex')
      return
    }
    if (form.lastName.value.length === 0) {
      const setFocus = () => {
        form.lastName.focus()
      }
      setMessageCallback(setFocus)
      setMessage(`Please, fill out your last name.`)
      setMessageVisibility('flex')
      return
    }
    if (
      video.hasOwnProperty('evaluations') &&
      video.evaluations.find(
        evaluation =>
          evaluation.evaluator.toLowerCase() === fullName.toLowerCase()
      )
    ) {
      setMessage(
        `Thank you for your ambition, ${fullName}, but you have already evaluated this speech.`
      )
      setMessageVisibility('flex')
      return
    }

    setEvaluation(event)

    form.reset()
    setDimensionsValues(initialDimensionsValues)
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
    Object.entries(dimensionsValues).map(dimension => {
      newEvaluation.dimensions.push({
        name: dimension[0],
        value: dimension[1],
      })
    })

    video.evaluations.push(newEvaluation)
    setVideo(video)
    patchVideo(id, video)
  }
  function setInitialDimenstionsValues() {
    evaluationDimensions.map(dimension => {
      const name = dimension.name
      return Object.assign(initialDimensionsValues, { [name]: 3 })
    })
  }
}

const Main = styled.main`
  background: #fff;
  padding: 20px;
  height: 100%;
  overflow-y: scroll;
`

const NavLinkStyled = styled(NavLink)`
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

// const VideoEvaluation = styled.form`
//   display: flex;
//   flex-wrap: wrap;
//   justify-content: center;
//   grid-gap: 20px;
//   margin: 20px 0;
//   label {
//     display: grid;
//     grid-template: auto auto auto / 1fr;
//     /* width: calc(50% - 8px); */
//     width: 100%;
//     grid-gap: 8px;
//   }

//   input[type='text'] {
//     font-size: 1rem;
//     width: 100%;
//   }
//   input[type='range'] {
//     width: 100%;
//   }
// `

// const VideoEvaluationSubmit = styled.button`
//   margin: 16px 0 4px 0;
//   align-self: center;
//   width: max-content;
//   border: none;
//   padding: 8px;
//   background: var(--primary-bg-color);
//   text-align: center;
//   font-size: 1rem;
//   color: var(--inverse-primary-font-color);
//   text-decoration: none;
// `
