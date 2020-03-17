import React from 'react'
import SpeechEvaluationFooter from './SpeechEvaluationFooter'

const sectionStyles = {
  padding: '20px',
  width: '600px',
  background: '#fff',
  margin: '20px auto',
}

const profile = {
  firstName: 'Albert',
  lastName: 'Schilling',
  id: '238yoakuhdfpiq3u4hriua',
}

const evaluation = {
  upvotes: [
    {
      id: '238yoakuhdfpiq3u4hriua',
      firstName: 'Albert',
      lastName: 'Schilling',
      date: 1584286613,
    },
    {
      id: 'sadlifjalsidjfklaj',
      firstName: 'Julia',
      lastName: 'Bauer',
      date: 1584286613,
    },
  ],
  downvotes: [
    {
      id: 'sadlifjalsidjfklaj',
      firstName: 'Julia',
      lastName: 'Bauer',
      date: 1584286613,
    },
  ],
  flags: [
    {
      id: 'sadlifjalsidjfklaj',
      firstName: 'Julia',
      lastName: 'Bauer',
      date: 1584286613,
    },
  ],
}

const voted = {
  upvotes: false,
  downvotes: false,
  flags: false,
}

const setVoted = () => {}

export default {
  title: 'Components/Evaluation/Footer',
  decorators: [storyFn => <section style={sectionStyles}>{storyFn()}</section>],
  component: SpeechEvaluationFooter,
}

export const DefaultSpeechEvaluationFooter = () => {
  return (
    <SpeechEvaluationFooter
      profile={profile}
      evaluation={evaluation}
      voted={voted}
      setVoted={setVoted}
    />
  )
}
