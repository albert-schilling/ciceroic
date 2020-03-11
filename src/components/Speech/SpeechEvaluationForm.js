import React from 'react'
import styled from 'styled-components/macro'
import { evaluationDimensions } from '../../data/evaluationDimensions'
import RangeInput from '../Inputs/RangeInput'
import UserMessage from '../UserMessage/UserMessage'

export default function SpeechEvaluationForm({
  evaluation,
  setEvaluation,
  handleSubmit,
  inputFirstNameRef,
  inputLastNameRef,
  message,
  handleClickOnUserMessage,
}) {
  return (
    <SpeechEvaluationFormStyled onSubmit={event => handleSubmit(event)}>
      <SpeechEvaluationFormSection>
        <label htmlFor="firstName">
          First Name
          <input
            autoFocus
            onChange={handleChange}
            ref={inputFirstNameRef}
            type="text"
            name="first name"
            id="firstName"
            value={evaluation.evaluator.firstName}
          />
        </label>

        <label htmlFor="lastName">
          Last Name
          <input
            ref={inputLastNameRef}
            type="text"
            name="last name"
            id="lastName"
            value={evaluation.evaluator.lastName}
            onChange={handleChange}
          />
        </label>
      </SpeechEvaluationFormSection>
      <SpeechEvaluationFormSection>
        {evaluationDimensions.map(dimension => {
          return (
            <RangeInput
              key={dimension.name}
              name={dimension.name}
              description={dimension.description}
              evaluation={evaluation}
              setEvaluation={setEvaluation}
            />
          )
        })}
      </SpeechEvaluationFormSection>
      <SpeechEvaluationSubmit type="submit">Submit</SpeechEvaluationSubmit>
      {message.visible === true && (
        <UserMessage message={message} handleClick={handleClickOnUserMessage} />
      )}
    </SpeechEvaluationFormStyled>
  )
  function handleChange(event) {
    if (event.target.name === 'first name') {
      setEvaluation({
        ...evaluation,
        evaluator: {
          ...evaluation.evaluator,
          firstName: event.target.value,
        },
      })
    }
    if (event.target.name === 'last name') {
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

const SpeechEvaluationFormStyled = styled.form`
  grid-area: evaluation;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  grid-gap: 20px;
  margin: 20px 0;
`
const SpeechEvaluationFormSection = styled.section`
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

const SpeechEvaluationSubmit = styled.button`
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
  cursor: pointer;
`
