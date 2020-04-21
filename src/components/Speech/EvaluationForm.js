import React from 'react'
import styled from 'styled-components/macro'
import { evaluationDimensions } from '../../data/evaluationDimensions'
import RangeInput from '../Inputs/RangeInput/RangeInput'
import TextArea from '../Inputs/TextArea/TextArea'
import Button from '../Inputs/Button/Button'

export default function SpeechEvaluationForm({
  evaluation,
  setEvaluation,
  handleSubmit,
  editMode,
  setEditMode,
  inputPraiseRef,
  inputSuggestionsRef,
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
      <TextArea
        title="Praise"
        name="praise"
        id="praise"
        maxLength={1000}
        initialValue={evaluation.praise}
        callback={handleChange}
        reference={inputPraiseRef}
        key="Praise"
      />
      <TextArea
        title="Suggestions"
        name="suggestions"
        id="praise"
        maxLength={1000}
        initialValue={evaluation.suggestions}
        callback={handleChange}
        reference={inputSuggestionsRef}
        key="Suggestions"
      />
      <ButtonRow>
        {editMode && (
          <Button
            name="cancel"
            callback={() => {
              setEditMode(false)
            }}
            text="Cancel"
            styling="tertiary"
          />
        )}
        <Button name="submit" text="Submit" styling="primary" type="submit" />
      </ButtonRow>
    </SpeechEvaluationFormStyled>
  )
  function handleChange(event) {
    setEvaluation({
      ...evaluation,
      [event.target.name]: event.target.value,
    })
  }
}

const SpeechEvaluationFormStyled = styled.form`
  display: grid;
  grid-gap: 20px;
  margin-bottom: 20px;
  border: 1px solid var(--highlight-color);
  padding: 20px;
  @media (min-width: 700px) {
    /* margin: 0 0 20px 0; */
  }
`
const SpeechEvaluationFormSection = styled.section`
  width: 100%;
  display: grid;
  justify-content: stretch;
  grid-gap: 24px;
`

const ButtonRow = styled.section`
  display: flex;
  justify-content: space-around;
`
