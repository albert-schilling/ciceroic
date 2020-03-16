import React, { useEffect } from 'react'
import styled from 'styled-components/macro'
import Statistics from './Statistics'
import Comment from './Comment'
import useDate from '../../hooks/useDate'
import DefaultButton from '../Inputs/DefaultButton'
import SpeechEvaluationFooter from './SpeechEvaluationFooter'

export default function SpeechEvaluation({
  title = 'Evaluation title:',
  evaluation,
  // setEvaluation,
  profile,
  handleVotes,
  speech,
  returnEvaluationByUser,
  user,
  editMode,
  setEditMode,
}) {
  const retrievedEvaluation = returnEvaluationByUser({ user, speech })
  const { convertTimestampToDate } = useDate()
  const evaluationLoaded = !!evaluation.date

  // useEffect(() => {
  //   setEvaluation(retrievedEvaluation)
  // }, [setEvaluation, retrievedEvaluation])

  if (evaluationLoaded) {
    const dimensions = Object.entries(evaluation.dimensions)
    const timestamp = new Date(evaluation.date)
    const date = convertTimestampToDate(timestamp)
    return (
      <EvaluationContainer>
        <EvaluationTitle>{title}</EvaluationTitle>
        <Statistics dimensions={dimensions} />
        {evaluation.praise && (
          <Comment
            header="What I liked about the speech:"
            content={evaluation.praise}
          />
        )}
        {evaluation.suggestions && (
          <Comment
            header="What could be improved:"
            content={evaluation.suggestions}
          />
        )}
        <EvaluationDate>Submitted: {date}.</EvaluationDate>
        {evaluation.evaluator.id === user.id ? (
          <DefaultButton
            name="Edit evaluation"
            callback={() => {
              setEditMode(!editMode)
            }}
            text="Edit"
          />
        ) : (
          <SpeechEvaluationFooter
            evaluation={evaluation}
            profile={profile}
            handleVotes={handleVotes}
          />
        )}
      </EvaluationContainer>
    )
  } else {
    return (
      <EvaluationContainer>
        <EvaluationTitle>Your evaluation:</EvaluationTitle>
        <p>Waiting on data</p>
      </EvaluationContainer>
    )
  }
}

const EvaluationContainer = styled.section`
  margin-bottom: 20px;
  border: 1px solid var(--light-grey);
  border-radius: 4px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media (min-width: 700px) {
    max-width: 600px;
    align-self: center;
  }
  p {
    line-height: 1.4rem;
  }
`

const EvaluationTitle = styled.h4`
  color: var(--secondary-font-color);
  font-size: 0.9rem;
  font-weight: inherit;
  margin: 0 0 12px 0;
`

const EvaluationDate = styled.p`
  margin: 0;
  color: var(--secondary-font-color);
  font-size: 0.9rem;
`
