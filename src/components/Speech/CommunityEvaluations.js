import React from 'react'
import styled from 'styled-components/macro'
import Evaluation from './Evaluation'
import useForm from '../../hooks/useForm'

export default function CommunityEvaluations({
  user,
  profile,
  speech,
  setSpeech,
}) {
  const { setEvaluation } = useForm()
  console.log('render community Evaluations')
  console.log('speech', speech)
  if (speech.hasOwnProperty('evaluations')) {
    return speech.evaluations
      .filter(evaluation => evaluation.evaluator.id !== user.id)
      .map(evaluation => {
        return (
          <Evaluation
            title={`Evaluation by ${evaluation.evaluator.firstName}`}
            user={user}
            evaluation={evaluation}
            setEvaluation={setEvaluation}
            profile={profile}
            speech={speech}
            setSpeech={setSpeech}
          />
        )
      })
  } else {
    return <p>Waiting for data</p>
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
