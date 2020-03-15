import { useState } from 'react'
import { patchSpeech } from '../services/speechServices'

export default function useForm({
  evaluationDimensions,
  speech,
  setSpeech,
  id,
  refs,
  profile,
  setProfile,
}) {
  const initialValues = {}
  evaluationDimensions.map(dimension =>
    Object.assign(initialValues, { [dimension.name]: 3 })
  )

  const [evaluation, setEvaluation] = useState({
    dimensions: { ...initialValues },
    evaluator: { firstName: '', lastName: '', id: '' },
    date: '',
    praise: '',
    suggestions: '',
    upvotes: [],
    downvotes: [],
    flags: [],
  })

  const [message, setMessage] = useState({
    visible: false,
    text: '',
    focusRef: refs[0],
  })

  const submitEvaluation = (event, setEditMode) => {
    event.preventDefault()

    if (searchMissingInput(refs)) {
      return
    }

    updateEvaluations()
    resetEvaluation()
    setMessage({
      ...message,
      visible: true,
      text: `Thank you ${evaluation.evaluator.firstName} ${evaluation.evaluator.lastName}. 
      Your evaluation has been submitted.`,
    })
    setEditMode(false)
  }

  function updateEvaluations() {
    evaluation.evaluator.firstName = profile.firstName
    evaluation.evaluator.lastName = profile.lastName
    evaluation.evaluator.id = profile.id
    Object.assign(evaluation, { date: new Date().getTime() })

    !speech.evaluations && Object.assign(speech, { evaluations: [] })

    const updatingExistingEvaluation = searchEvaluator(profile.id)

    if (updatingExistingEvaluation) {
      const index = speech.evaluations.findIndex(
        evaluation => evaluation.evaluator.id === profile.id
      )
      speech.evaluations.splice(index, 1, evaluation)
      console.log(`Evaluation at index ${index} updated:`, speech)
    } else {
      speech.evaluations.push(evaluation)
      console.table('New evaluation added to speech:', speech)
    }
    setSpeech(speech)
    patchSpeech(id, speech)
  }

  function resetEvaluation() {
    setEvaluation({
      dimensions: { ...initialValues },
      evaluator: { firstName: '', lastName: '', id: '' },
      date: '',
      praise: '',
      suggestions: '',
      upvotes: [],
      downvotes: [],
      flags: [],
    })
  }

  function searchMissingInput(references) {
    const missingInput = references.find(reference => !reference.current.value)
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

  function searchEvaluator(userId) {
    let evaluations = []
    const foundEvaluator =
      speech && speech.evaluations
        ? ((evaluations = speech.evaluations),
          evaluations.some(evaluation => evaluation.evaluator.id === userId))
        : false
    return foundEvaluator
  }

  function returnEvaluationByUser({ user, speech }) {
    let foundEvaluation = {}
    speech && speech.evaluations
      ? (foundEvaluation = speech.evaluations.filter(
          evaluation => evaluation.evaluator.id === user.id
        )[0])
      : (foundEvaluation = {
          dimensions: { ...initialValues },
          evaluator: { firstName: '', lastName: '', id: '' },
          date: '',
        })
    return foundEvaluation
  }

  function handleClickOnUserMessage(userId) {
    console.log('message.focusRef:', message.focusRef)
    message.focusRef.current && message.focusRef.current.focus()
    setMessage({
      ...message,
      visible: false,
    })
  }

  function handleVoteOnEvaluation(event, evaluation) {
    event.preventDefault()
    console.log('event.target.name clicked', event.target.name)
    const voteType = event.target.name
    updateVotesInEvaluation(voteType, evaluation)
  }

  function updateVotesInEvaluation(voteType, evaluation) {
    console.log('evaluation before update', evaluation)
    addSingleVoteTypeIfMissing(voteType)
    const newVote = {
      id: profile.id,
      firstName: profile.firstName,
      lastName: profile.lastName,
      date: new Date().getTime(),
    }
    const index = evaluation[voteType].findIndex(vote => vote.id === profile.id)

    index >= 0
      ? evaluation[voteType].splice(index, 1)
      : evaluation[voteType].push(newVote)
    setEvaluation(evaluation)
    console.log('evaluation after update', evaluation)
    const indexOfEvaluationInSpeech = speech.evaluations.findIndex(
      storedEvaluation => {
        console.log(
          'storedEvaluation.evaluator.id',
          storedEvaluation.evaluator.id
        )
        console.log('evaluation.evaluator.id', evaluation.evaluator.id)
        return storedEvaluation.evaluator.id === evaluation.evaluator.id
      }
    )

    speech.evaluations.splice(indexOfEvaluationInSpeech, 1, evaluation)
    console.log(
      `Evaluation at index ${indexOfEvaluationInSpeech} updated:`,
      speech
    )

    setSpeech(speech)
    console.log('updated speech:', speech)
    // patchSpeech(id, speech)
  }

  function addSingleVoteTypeIfMissing(voteType) {
    evaluation.hasOwnProperty(voteType) ||
      Object.assign(evaluation, { [voteType]: [] })
  }

  return {
    evaluation,
    setEvaluation,
    message,
    setMessage,
    submitEvaluation,
    updateEvaluations,
    handleClickOnUserMessage,
    searchEvaluator,
    returnEvaluationByUser,
    handleVoteOnEvaluation,
  }
}
