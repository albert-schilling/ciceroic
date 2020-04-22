import React from 'react'
import Evaluation from './Evaluation'
import useForm from '../../hooks/useForm'

export default function CommunityEvaluations({
  user,
  profile,
  speech,
  setSpeech,
  setModal = () => {},
  setSpeakerId = () => {},
}) {
  const { setEvaluation } = useForm()

  return (
    <>
      {speech.evaluations ? (
        <>
          {speech.evaluations
            .filter(evaluation => evaluation.evaluator.id !== user._id)
            .sort((a, b) => {
              return (
                b.upvotes.length -
                b.downvotes.length -
                (a.upvotes.length - a.downvotes.length)
              )
            })
            .map(evaluation => (
              <Evaluation
                key={`Evaluation by ${evaluation.evaluator.firstName}`}
                title={`Evaluation by ${evaluation.evaluator.firstName}`}
                user={user}
                evaluation={evaluation}
                setEvaluation={setEvaluation}
                profile={profile}
                speech={speech}
                setSpeech={setSpeech}
                setSpeakerId={setSpeakerId}
                setModal={setModal}
              />
            ))}
        </>
      ) : (
        <></>
      )}
    </>
  )
}
