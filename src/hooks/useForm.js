import { useState } from 'react'
import { patchSpeech } from '../services/speechServices'

export default function useForm({
  evaluationDimensions,
  speech,
  setSpeech,
  id,
  refs,
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
    focusRef: refs[0],
  })

  const handleSubmit = event => {
    event.preventDefault()

    if (searchMissingInput(refs)) {
      return
    }

    if (searchEvaluator()) {
      return
    }

    updateEvaluation()
    resetEvaluation()
    setMessage({
      ...message,
      visible: true,
      text: `Thank you ${evaluation.evaluator.firstName} ${evaluation.evaluator.lastName}. 
      Your evaluation has been submitted.`,
      focusRef: refs[0],
    })
  }

  function updateEvaluation() {
    evaluation.evaluator.firstName = evaluation.evaluator.firstName.trim()
    evaluation.evaluator.lastName = evaluation.evaluator.lastName.trim()
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
        focusRef: missingInput,
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
        focusRef: refs[0],
      })
    }
    return foundEvaluator
  }

  function handleClickOnUserMessage() {
    message.focusRef.current.focus()
    setMessage({
      ...message,
      visible: false,
      focusRef: refs[0],
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
