import React, { useEffect, useState, useRef } from 'react'
import styled from 'styled-components/macro'
import useDate from '../../hooks/useDate'
import DefaultButton from '../Inputs/DefaultButton'
import Comment from './Comment'
import SpeechEvaluationFooter from './SpeechEvaluationFooter'
import Statistics from './Statistics'
import useForm from '../../hooks/useForm'
import Evaluation from './Evaluation'
import EvaluationForm from './EvaluationForm'
import useSpeech from '../../hooks/useSpeech'

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
    // message,
    submitEvaluation,
    // handleClickOnUserMessage,
    returnEvaluationByUser,
  } = useForm()

  const { editMode, setEditMode } = useSpeech()
  const [foundEvaluator, setFoundEvaluator] = useState('')
  const inputPraiseRef = useRef(null)
  const inputSuggestionsRef = useRef(null)
  const refs = [inputPraiseRef, inputSuggestionsRef]

  useEffect(() => {
    const foundEvaluation = returnEvaluationByUser({ user, speech })
    if (foundEvaluation != null) {
      Object.assign(evaluation, foundEvaluation)
      setEvaluation(evaluation)
      setFoundEvaluator(true)
    }
    setEditMode(false)
  }, [user, speech])
  console.log('evaluation in UserEv', evaluation)
  // if (evaluation.date != '') {
  if (foundEvaluator && !editMode) {
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
  // } else {
  //   return (
  //     <EvaluationContainer>
  //       <p>Waiting on data inside UserEv</p>
  //     </EvaluationContainer>
  //   )
  // }
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
