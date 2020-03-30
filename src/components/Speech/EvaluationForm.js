import React from 'react'
import styled from 'styled-components/macro'
import { evaluationDimensions } from '../../data/evaluationDimensions'
import RangeInput from '../Inputs/RangeInput'
import TextArea from '../Inputs/TextArea/TextArea'
import DefaultButton from '../Inputs/Buttons/DefaultButton'

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
        maxlength={1000}
        evaluation={evaluation}
        setEvaluation={setEvaluation}
        reference={inputPraiseRef}
        key="Praise"
      />
      <TextArea
        title="Suggestions"
        name="suggestions"
        maxlength={1000}
        evaluation={evaluation}
        setEvaluation={setEvaluation}
        reference={inputSuggestionsRef}
        key="Suggestions"
      />
      <ButtonRow>
        {editMode && (
          <DefaultButton
            name="cancel"
            callback={() => {
              setEditMode(false)
            }}
            text="Cancel"
            color="tertiary"
          />
        )}
        <DefaultButton
          name="submit"
          text="Submit"
          color="primary"
          type="submit"
        />
      </ButtonRow>
    </SpeechEvaluationFormStyled>
  )
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
  justify-content: center;
  grid-gap: 24px;
  @media (min-width: 700px) {
    width: 100%;
    display: flex;
    grid-gap: 0;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
  }
`

const ButtonRow = styled.section`
  display: flex;
  justify-content: space-around;
`
