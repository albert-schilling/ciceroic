import React from 'react'
import styled from 'styled-components/macro'
import { evaluationDimensions } from '../../data/evaluationDimensions'
import RangeInput from '../Inputs/RangeInput'
import UserMessage from '../UserMessage/UserMessage'

export default function SpeechEvaluationForm({
  evaluation,
  setEvaluation,
  submitEvaluation,
  message,
  handleClickOnUserMessage,
  editMode,
  setEditMode,
}) {
  return (
    <SpeechEvaluationFormStyled onSubmit={handleSubmit}>
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
      {editMode &&
        (() => (
          <SpeechEvaluationSubmit onClick={() => setEditMode(false)}>
            Cancel
          </SpeechEvaluationSubmit>
        ))()}
      <SpeechEvaluationSubmit type="submit">Submit</SpeechEvaluationSubmit>
    </SpeechEvaluationFormStyled>
  )
  async function handleSubmit(event) {
    await submitEvaluation(event, setEditMode)
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
