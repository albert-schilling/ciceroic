import React from 'react'
import Evaluation from './Evaluation'
import useForm from '../../hooks/useForm'

export default function CommunityEvaluations({
  user,
  profile,
  speech,
  setSpeech,
}) {
  const { setEvaluation } = useForm()

  if (speech.hasOwnProperty('evaluations')) {
    return speech.evaluations
      .filter(evaluation => evaluation.evaluator.id !== user.id)
      .map(evaluation => {
        return (
          <Evaluation
            key={`Evaluation by ${evaluation.evaluator.firstName}`}
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
