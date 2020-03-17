import { useState } from 'react'
import { patchSpeech } from '../services/speechServices'
import { evaluationDimensions } from '../data/evaluationDimensions'

export default function useForm() {
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
    focusRef: null,
  })

  const submitEvaluation = ({
    event,
    evaluation,
    setEvaluation,
    message,
    setMessage,
    speech,
    setSpeech,
    user,
    profile,
    editMode,
    setEditMode,
    refs,
  }) => {
    event.preventDefault()
    setMessage({
      visible: false,
      text: '',
      focusRef: null,
    })

    console.log('SearchMissingInput', refs)
    if (searchMissingInput({ refs, message, setMessage })) {
      return
    }

    updateEvaluations({
      evaluation,
      setEvaluation,
      speech,
      setSpeech,
      profile,
      user,
    })
    editMode || resetEvaluation({ setEvaluation })
    setMessage({
      ...message,
      visible: true,
      text: `Thank you ${evaluation.evaluator.firstName} ${evaluation.evaluator.lastName}. 
      Your evaluation has been submitted.`,
    })
    setEditMode(false)
  }

  function updateEvaluations({ evaluation, speech, setSpeech, profile, user }) {
    evaluation.evaluator.firstName = profile.firstName
    evaluation.evaluator.lastName = profile.lastName
    evaluation.evaluator.id = profile.id
    Object.assign(evaluation, { date: new Date().getTime() })

    !speech.evaluations && Object.assign(speech, { evaluations: [] })

    const updatingExistingEvaluation = searchEvaluator({ user, speech })

    if (updatingExistingEvaluation) {
      const index = speech.evaluations.findIndex(
        evaluation => evaluation.evaluator.id === profile.id
      )
      speech.evaluations.splice(index, 1, evaluation)
    } else {
      speech.evaluations.push(evaluation)
      console.table('New evaluation added to speech:', speech)
    }
    setSpeech(speech)
    console.log('Patching speech:', speech)
    patchSpeech(speech._id, speech)
  }

  function resetEvaluation({ setEvaluation }) {
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

  function searchMissingInput({ refs, message, setMessage }) {
    console.log('SearchMissingInput entered')

    const missingInput = refs.find(reference => !reference.current.value)
    if (!!missingInput) {
      setMessage({
        ...message,
        visible: true,
        text: `Please, fill out your ${missingInput.current.name}.`,
        focusRef: missingInput,
      })
    }
    console.log('SearchMissingInput !!missinginput', !!missingInput)

    return !!missingInput
  }

  function searchEvaluator({ user, speech }) {
    let evaluations = []
    const foundEvaluator =
      speech && speech.evaluations
        ? ((evaluations = speech.evaluations),
          evaluations.some(evaluation => evaluation.evaluator.id === user.id))
        : false
    return foundEvaluator
  }

  function returnEvaluationByUser({ user, speech }) {
    let foundEvaluation = {}
    speech && speech.evaluations
      ? (foundEvaluation = speech.evaluations.filter(
          evaluation => evaluation.evaluator.id === user.id
        )[0])
      : (foundEvaluation = null)
    return foundEvaluation
  }

  function handleClickOnUserMessage(userId) {
    message.focusRef.current && message.focusRef.current.focus()
    setMessage({
      ...message,
      visible: false,
    })
  }

  function handleVoteOnEvaluation({
    event,
    evaluation,
    setEvaluation,
    profile,
    speech,
    setSpeech,
  }) {
    event.preventDefault()
    const voteType = event.target.name
    // console.log('event.target.name in handleVote', event.target.name)
    // const timestamp = new Date().getTime()

    // updateVotesInEvaluation()

    console.log('evaluation before update', evaluation)
    addSingleVoteTypeIfMissing()
    toggleVoteInEvaluation()
    removeOppositeVoteType()

    setEvaluation(evaluation)

    console.log('evaluation after update', evaluation)

    const indexOfEvaluationInSpeech = speech.evaluations.findIndex(
      storedEvaluation => {
        return storedEvaluation.evaluator.id === evaluation.evaluator.id
      }
    )
    speech.evaluations.splice(indexOfEvaluationInSpeech, 1, evaluation)

    setSpeech(speech)
    console.log('newSpeech', speech)
    patchSpeech(speech._id, speech)

    // async function updateVotesInEvaluation() {}

    function addSingleVoteTypeIfMissing() {
      // const newObject = {
      //   date: 1584436926707,
      //   firstName: 'test',
      //   lastName: 'test',
      //   id: '123123',
      // }
      // console.log(evaluation)
      // console.log(
      //   'evaluation.hasOwnProperty(voteType)',
      //   evaluation.hasOwnProperty(voteType)
      // )
      evaluation.hasOwnProperty(voteType) ||
        Object.assign(evaluation, { [voteType]: [] })
      // console.log('assigned a single voteType', evaluation)
      // console.log('evaluation[voteType]', evaluation[voteType])
      // evaluation[voteType].forEach(vote =>
      //   console.log('iterating through votes', vote)
      // )
      // console.log('evaluation[voteType].length', evaluation[voteType].length)
    }

    function removeOppositeVoteType() {
      voteType === 'upvotes' && removeVoteInEvaluation('downvotes')
      voteType === 'downvotes' && removeVoteInEvaluation('upvotes')
    }

    function toggleVoteInEvaluation() {
      const newVote = {
        id: profile.id,
        firstName: profile.firstName,
        lastName: profile.lastName,
        date: new Date().getTime(),
      }
      // console.log('PROFILE', profile)
      // console.log('PROFILE', profile.firstName)
      // console.log('PROFILE', profile.lastName)
      // const newVote = { test: 'testvote' }
      const index = evaluation[voteType].findIndex(
        vote => vote.id === profile.id
      )
      // const votes = evaluation[voteType]
      // console.log('votes in toggleVote before push', votes)

      // const votesTest = evaluation[voteType]

      // votesTest.forEach(vote => {
      //   console.log('vote', vote)
      //   console.log('vote.id', vote.id)
      //   console.log('profile.id', profile.id)
      // })

      // console.log('votesTest', votesTest)
      // console.log('isArray', Array.isArray(votesTest))
      // console.log('Array length', votesTest.length)
      // console.log('votesTest[0]', votesTest[0])

      // console.log('profile in toggleVote', profile)
      // console.log('index in toggleVote', index)
      // console.log('voteType in toggelVote', voteType)
      // console.log('evaluation[voteType] in toggelVote', evaluation[voteType])
      // console.log('evaluation[voteType][0] in toggelVote', votesTest[0])
      console.log('index in toggle Vote', index)
      console.log('newVote in toggle Vote', newVote)
      index >= 0
        ? evaluation[voteType].splice(index, 1)
        : evaluation[voteType].push(newVote)
      // Object.assign(evaluation, {[voteType]: [...evaluation[voteType], newVote]})
      // evaluation[voteType].push(newVote)
      // votes.push({ name: 'newObject' })
      // console.log('votes after push in toggle Vote', votes)
      // votes.push(newVote)
      // votes.push(newVote)

      // console.log('new length', votes.length)
      // console.log('votes is array', Array.isArray(votes))
      // // votes = [...votes, newVote]]
      // console.log('votes in toggleVote after push', votes)

      // Object.assign(evaluation, { [voteType]: votes })
      console.log('evaluation[voteType] in toggle vote', evaluation[voteType])
      console.log('evaluation after add logic', evaluation)
    }

    function removeVoteInEvaluation(voteType) {
      const index = evaluation[voteType].findIndex(
        vote => vote.id === profile.id
      )
      index >= 0 && evaluation[voteType].splice(index, 1)
    }
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
