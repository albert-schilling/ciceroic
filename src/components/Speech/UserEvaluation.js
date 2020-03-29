import React, { useEffect, useRef, useState } from 'react'
import useForm from '../../hooks/useForm'
import useSpeech from '../../hooks/useSpeech'
import Evaluation from './Evaluation'
import EvaluationForm from './EvaluationForm'

export default function UserEvaluation({
  speech,
  setSpeech,
  user,
  profile,
  message,
  setMessage,
}) {
  const {
    evaluation,
    setEvaluation,
    emptyEvaluation,
    submitEvaluation,
    getEvaluationByCurrentUser,
  } = useForm()

  const { editMode, setEditMode } = useSpeech()
  const [foundEvaluator, setFoundEvaluator] = useState(false)
  const inputPraiseRef = useRef(null)
  const inputSuggestionsRef = useRef(null)
  const refs = [inputPraiseRef, inputSuggestionsRef]

  useEffect(() => {
    prepareEvaluation({ user, speech })
  }, [user, speech])

  if (speech.userId === user._id) {
    return <></>
  } else if (foundEvaluator && !editMode) {
    return (
      <Evaluation
        title="Your evaluation"
        user={user}
        evaluation={evaluation}
        editMode={editMode}
        setEditMode={setEditMode}
      />
    )
  } else {
    return (
      <EvaluationForm
        user={user}
        evaluation={evaluation}
        setEvaluation={setEvaluation}
        editMode={editMode}
        setEditMode={setEditMode}
        inputPraiseRef={inputPraiseRef}
        inputSuggestionsRef={inputSuggestionsRef}
        handleSubmit={handleSubmit}
      />
    )
  }

  function handleSubmit(event) {
    submitEvaluation({
      event,
      evaluation,
      setEvaluation,
      message,
      setMessage,
      speech,
      setSpeech,
      profile,
      user,
      editMode,
      setEditMode,
      refs,
    })
  }
  function prepareEvaluation({ user, speech }) {
    const foundEvaluation = getEvaluationByCurrentUser({ user, speech })
    if (foundEvaluation != null) {
      // Object.assign(evaluation, foundEvaluation)
      setEvaluation(foundEvaluation)
      setFoundEvaluator(true)
    } else {
      setFoundEvaluator(false)
      setEvaluation(emptyEvaluation)
    }
    setEditMode(false)
  }
}
