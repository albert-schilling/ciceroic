import React from 'react'
import styled from 'styled-components/macro'
import { evaluationDimensions } from '../../data/evaluationDimensions'
import VideoEvaluationInputRange from './VideoEvaluationInputRange'

export default function VideoEvaluationForm({
  evaluation,
  setEvaluation,
  handleSubmit,
}) {
  return (
    <VideoEvaluationFormStyled onSubmit={event => handleSubmit(event)}>
      <VideoEvaluationFormSection>
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
      </VideoEvaluationFormSection>
      <VideoEvaluationFormSection>
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
      </VideoEvaluationFormSection>
      <VideoEvaluationSubmit type="submit">Submit</VideoEvaluationSubmit>
    </VideoEvaluationFormStyled>
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

const VideoEvaluationFormStyled = styled.form`
  grid-area: evaluation;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  grid-gap: 20px;
  margin: 20px 0;
`
const VideoEvaluationFormSection = styled.section`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  grid-gap: 24px;

  label {
    width: 100%;
    grid-gap: 8px;
    display: flex;
    flex-direction: column;
  }
  input[type='text'] {
    font-size: 1rem;
  }
  input[type='range'] {
  }

  @media (min-width: 700px) {
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;

    label {
      width: calc(50% - 12px);
    }
  }
`

const VideoEvaluationSubmit = styled.button`
  margin: 16px 0 40px 0;
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
