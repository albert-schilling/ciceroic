import React, { useState } from 'react'
import styled from 'styled-components/macro'
import { evaluationDimensions } from '../data/evaluationDimensions'
import VideoEvaluationInputRange from './VideoEvaluationInputRange'

export default function VideoEvaluationComp({
  evaluation,
  setEvaluation,
  dimensionsValues,
  setDimensionsValues,
  handleSubmit,
}) {
  // const [evaluator, setEvaluator] = useState({})
  return (
    <VideoEvaluation onSubmit={event => handleSubmit(event)}>
      <label htmlFor="firstName">
        First Name
        <input
          type="text"
          name="firstName"
          id="firstName"
          value={
            evaluation.hasOwnProperty('evaluator') &&
            evaluation.evaluator.hasOwnProperty('firstName')
              ? evaluation.evaluator.firstName
              : ''
          }
          onChange={handleChange}
        />
      </label>

      <label htmlFor="lastName">
        Last Name
        <input
          type="text"
          name="lastName"
          id="lastName"
          value={
            evaluation.hasOwnProperty('evaluator') &&
            evaluation.evaluator.hasOwnProperty('lastName')
              ? evaluation.evaluator.lastName
              : ''
          }
          onChange={handleChange}
        />
      </label>
      {evaluationDimensions.map(dimension => {
        return (
          <VideoEvaluationInputRange
            key={dimension.name}
            name={dimension.name}
            description={dimension.description}
            evaluation={evaluation}
            setEvaluation={setEvaluation}
          />
        )
      })}
      <VideoEvaluationSubmit type="submit">Submit</VideoEvaluationSubmit>
    </VideoEvaluation>
  )
  function handleChange(event) {
    if (event.target.name === 'firstName') {
      setEvaluation({
        ...evaluation,
        evaluator: {
          ...evaluation.evaluator,
          firstName: event.target.value,
        },
      })
    }
    if (event.target.name === 'lastName') {
      setEvaluation({
        ...evaluation,
        evaluator: {
          ...evaluation.evaluator,
          lastName: event.target.value,
        },
      })
    }
    console.log(evaluation)
  }
  // function handleSubmit(event) {
  //   event.preventDefault()

  //   const form = event.target
  //   const fullName = `${form.firstName.value} ${form.lastName.value}`

  //   if (form.firstName.value.length === 0) {
  //     const setFocus = () => {
  //       form.firstName.focus()
  //     }
  //     setMessageCallback(setFocus)
  //     setMessage(`Please, fill out your first name.`)
  //     setMessageVisibility('flex')
  //     return
  //   }
  //   if (form.lastName.value.length === 0) {
  //     const setFocus = () => {
  //       form.lastName.focus()
  //     }
  //     setMessageCallback(setFocus)
  //     setMessage(`Please, fill out your last name.`)
  //     setMessageVisibility('flex')
  //     return
  //   }
  //   if (
  //     video.hasOwnProperty('evaluations') &&
  //     video.evaluations.find(
  //       evaluation =>
  //         evaluation.evaluator.toLowerCase() === fullName.toLowerCase()
  //     )
  //   ) {
  //     setMessage(
  //       `Thank you for your ambition, ${fullName}, but you have already evaluated this speech.`
  //     )
  //     setMessageVisibility('flex')
  //     return
  //   }

  //   setEvaluation(event)

  //   form.reset()
  //   setDimensionsValues(initialDimensionsValues)
  //   setMessageVisibility('flex')
  //   setMessage(`Thank you ${fullName}. Your evaluation has been submitted.`)
  // }

  // function setEvaluation(event) {
  //   video.hasOwnProperty('evaluations')
  //     ? console.log(video.evaluations)
  //     : Object.assign(video, { evaluations: [] })
  //   const evaluator = `${event.target.firstName.value} ${event.target.lastName.value}`
  //   const newEvaluation = {
  //     evaluator,
  //     date: new Date().getTime(),
  //     dimensions: [],
  //   }
  //   Object.entries(dimensionsValues).map(dimension => {
  //     newEvaluation.dimensions.push({
  //       name: dimension[0],
  //       value: dimension[1],
  //     })
  //   })

  //   video.evaluations.push(newEvaluation)
  //   setVideo(video)
  //   patchVideo(id, video)
  // }
  // function setInitialDimenstionsValues() {
  //   evaluationDimensions.map(dimension => {
  //     const name = dimension.name
  //     return Object.assign(initialDimensionsValues, { [name]: 3 })
  //   })
  // }
}

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
