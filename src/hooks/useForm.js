import { useState } from 'react'
import { patchSpeech } from '../services/speechServices'

export default function useForm({
  evaluationDimensions,
  speech,
  setSpeech,
  id,
  // refs,
  userData,
}) {
  // refs.forEach((ref, index) => console.log(`ref at index ${index}:`, ref))

  const initialValues = {}
  evaluationDimensions.map(dimension =>
    Object.assign(initialValues, { [dimension.name]: 3 })
  )

  const [evaluation, setEvaluation] = useState({
    dimensions: { ...initialValues },
    evaluator: { firstName: '', lastName: '', id: '' },
    date: '',
  })

  const [message, setMessage] = useState({
    visible: false,
    text: '',
    // focusRef: refs[0],
  })

  const handleSubmit = event => {
    event.preventDefault()

    // if (searchMissingInput(refs)) {
    //   return
    // }

    // if (searchEvaluator()) {
    //   return
    // }

    updateEvaluation()
    resetEvaluation()
    setMessage({
      ...message,
      visible: true,
      text: `Thank you ${evaluation.evaluator.firstName} ${evaluation.evaluator.lastName}. 
      Your evaluation has been submitted.`,
    })
  }

  function updateEvaluation() {
    evaluation.evaluator.firstName = userData.firstName
    evaluation.evaluator.lastName = userData.lastName
    evaluation.evaluator.id = userData.id
    Object.assign(evaluation, { date: new Date().getTime() })
    speech.evaluations.push(evaluation)
    console.table('new evaluation:', evaluation)
    setSpeech(speech)
    patchSpeech(id, speech)
  }

  function resetEvaluation() {
    setEvaluation({
      dimensions: { ...initialValues },
      evaluator: { firstName: '', lastName: '', id: '' },
      date: '',
    })
  }

  function searchMissingInput(references) {
    const missingInput = references.find(reference => !reference.current.value)
    console.log('references', references)
    if (!!missingInput) {
      setMessage({
        ...message,
        visible: true,
        text: `Please, fill out your ${missingInput.current.name}.`,
      })
    }
    return !!missingInput
  }

  function searchEvaluator(userId) {
    let evaluations = []
    const foundEvaluator =
      speech && speech.evaluations
        ? ((evaluations = speech.evaluations),
          evaluations.some(evaluation => evaluation.evaluator.id === userId))
        : false
    return foundEvaluator
  }

  function returnEvaluationByUser(userId) {
    const foundEvaluation = speech.evaluations.filter(
      evaluation => evaluation.evaluator.id === userId
    )[0]
    return foundEvaluation
  }

  function handleClickOnUserMessage(userId) {
    // message.focusRef.current.focus()
    setMessage({
      ...message,
      visible: false,
    })
  }

  return {
    evaluation,
    setEvaluation,
    message,
    setMessage,
    handleSubmit,
    handleClickOnUserMessage,
    searchEvaluator,
    returnEvaluationByUser,
  }
}
