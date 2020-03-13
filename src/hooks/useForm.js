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
    evaluator: { firstName: '', lastName: '' },
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
    Object.assign(evaluation, { date: new Date().getTime() })
    speech.evaluations.push(evaluation)
    console.table('new evaluation:', evaluation)
    setSpeech(speech)
    patchSpeech(id, speech)
  }

  function resetEvaluation() {
    setEvaluation({
      dimensions: { ...initialValues },
      evaluator: { firstName: '', lastName: '' },
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

  function searchEvaluator() {
    const fullName = `${evaluation.evaluator.firstName} ${evaluation.evaluator.lastName}`
    const foundEvaluator = speech.evaluations.some(storedEvaluation => {
      const storedFullName = `${storedEvaluation.evaluator.firstName} ${storedEvaluation.evaluator.lastName}`

      return storedFullName.toLowerCase() === fullName.toLowerCase()
    })
    if (foundEvaluator) {
      setMessage({
        ...message,
        visible: true,
        text: `Sorry, ${fullName},
        you have already evaluated this speech.`,
      })
    }
    return foundEvaluator
  }

  function handleClickOnUserMessage() {
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
  }
}
