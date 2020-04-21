import React from 'react'
import styled from 'styled-components/macro'
import useDate from '../../hooks/useDate'
import useForm from '../../hooks/useForm'
import Button from '../Inputs/Button/Button'
import Comment from './Comment'
import EvaluationFooter from './EvaluationFooter'
import Statistics from './Statistics'
import useSpeech from '../../hooks/useSpeech'

export default function Evaluation({
  title = 'Evaluation title:',
  evaluation,
  setEvaluation,
  user,
  editMode,
  setEditMode,
  profile,
  speech,
  setSpeech,
  setModal = () => {},
  setSpeakerId = () => {},
}) {
  const { handleVoteOnEvaluation } = useForm()
  const { returnDimensionsFromEvaluation } = useSpeech()

  const { convertTimestampToDate } = useDate()
  const date = evaluation.date && convertTimestampToDate(evaluation.date)
  const dimensions = returnDimensionsFromEvaluation(evaluation.dimensions)
  return (
    <EvaluationContainer>
      {evaluation.evaluator.id === user._id ? (
        <EvaluationTitle>{title}</EvaluationTitle>
      ) : (
        <EvaluationTitle onClick={showProfile} style={{ cursor: 'pointer' }}>
          {title}
        </EvaluationTitle>
      )}

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
      {evaluation.evaluator.id === user._id ? (
        <Button
          name="Edit evaluation"
          callback={() => {
            setEditMode(!editMode)
          }}
          text="Edit"
          styling="primary"
        />
      ) : (
        <EvaluationFooter
          evaluation={evaluation}
          setEvaluation={setEvaluation}
          user={user}
          handleVotes={handleVotes}
        />
      )}
    </EvaluationContainer>
  )
  function handleVotes(event, evaluation) {
    event.preventDefault()

    handleVoteOnEvaluation({
      event,
      evaluation,
      profile,
      setEvaluation,
      speech,
      setSpeech,
    })
  }
  function showProfile(event) {
    event.preventDefault()
    setModal('profile')
    setSpeakerId(evaluation.evaluator.id)
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
    align-self: flex-start;
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
