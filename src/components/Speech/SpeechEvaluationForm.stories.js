import { withKnobs } from '@storybook/addon-knobs'
import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import GlobalStyle from '../../common/GlobalStyle'
import SpeechEvaluationForm from './SpeechEvaluationForm'

const evaluation = {
  dimensions: {},
  evaluator: { firstName: '', lastName: '' },
  date: '',
}

const speech = {
  category: 'Lecture',
  date: 'Jun 27, 2014',
  description:
    "Have you ever felt like you're talking, but nobody is listening? Here's Julian Treasure to help you fix that. As the sound expert demonstrates some useful vocal exercises and shares tips on how to speak with empathy, he offers his vision for a sonorous world of listening and understanding.",
  duration: '9.58',
  evaluations: [
    {
      dimensions: {
        'Comprehensibility and Structure': 1,
        'Credible and Convincing': 1,
        'Gestures And Facial Expressions': 1,
        'Pronounciation and Vocal Variety': 4,
        'Stylistic Devices': 4,
      },
      evaluator: { firstName: 'Albert', lastName: 'Schilling' },
    },
  ],
  filename: 'How to speak so that people want to listen _ Julian Treasure.mp4',
  id: '1',
  speaker: 'Julian Treasure',
  title: 'How to speak so that people want to listen',
}

const message = {
  visible: 'none',
  text: '',
  buttonRef: null,
  confirmHandler: () => {},
  focusRef: null,
}

const sectionStyles = {
  padding: '20px',
}

export default {
  title: 'Components/SpeechEvaluationForm',
  decorators: [
    withKnobs,
    storyFn => (
      <Router>
        <GlobalStyle />
        <section style={sectionStyles}>{storyFn()}</section>
      </Router>
    ),
  ],
  component: SpeechEvaluationForm,
}

export const StandardSpeechEvaluationForm = () => {
  return (
    <SpeechEvaluationForm
      evaluation={evaluation}
      speech={speech}
      message={message}
    />
  )
}
