import React from 'react'
import styled from 'styled-components/macro'
import { evaluationDimensions } from '../data/evaluationDimensions'
import VideoEvaluationInputRange from './VideoEvaluationInputRange'

export default function VideoEvaluation({
  evaluation,
  setEvaluation,
  handleSubmit,
}) {
  return (
    <VideoEvaluationForm onSubmit={event => handleSubmit(event)}>
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
    </VideoEvaluationForm>
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
  }
}

const VideoEvaluationForm = styled.form`
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
