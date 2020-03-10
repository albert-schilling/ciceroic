import { useState, useRef } from 'react'
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
    visible: 'none',
    text: '',
    buttonRef: useRef(null),
    confirmHandler: () => {},
    focusRef: refs[0].current,
  })

  const handleSubmit = event => {
    event.preventDefault()
    // document.addEventListener('keyup', event => {
    //   if (event.isComposing || event.keyCode === 229) {
    //     return
    //   }
    //   // do something
    // })
    message.buttonRef.current.focus()

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
      visible: 'flex',
      text: `Thank you ${evaluation.evaluator.firstName} ${evaluation.evaluator.lastName}. 
      Your evaluation has been submitted.`,
      confirmHandler: focusReference,
      focusRef: refs[0],
    })
    message.buttonRef.current.focus()
  }

  function updateEvaluation() {
    console.log(evaluation.evaluator.firstName)
    evaluation.evaluator.firstName.trim(' ')
    console.log(evaluation.evaluator.firstName)

    evaluation.evaluator.lastName.trim(' ')
    Object.assign(evaluation, { date: new Date().getTime() })
    speech.evaluations.push(evaluation)
    console.log(evaluation)
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

    if (!!missingInput) {
      setMessage({
        ...message,
        visible: 'flex',
        text: `Please, fill out your ${missingInput.current.name}.`,
        confirmHandler: focusReference,
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
        visible: 'flex',
        text: `Sorry, ${fullName},
        you have already evaluated this speech.`,
        confirmHandler: focusReference,
        focusRef: refs[0],
      })
    }
    return foundEvaluator
  }

  function focusReference(ref) {
    ref.current.focus()
  }

  return { evaluation, setEvaluation, message, setMessage, handleSubmit }
}
