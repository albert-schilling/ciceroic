import { action } from '@storybook/addon-actions'
import { withKnobs, text, boolean } from '@storybook/addon-knobs'
import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Speech from './Speech'
import App from '../../App'

import GlobalStyle from '../../common/GlobalStyle'

const videoBasePath = '/videos/'

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

export default {
  title: 'Components/Speech',
  decorators: [
    withKnobs,
    storyFn => (
      <Router>
        <GlobalStyle />
        {storyFn()}
      </Router>
    ),
  ],
  component: Speech,
}

export const SpeechPage = () => (
  <Speech
    // videos={videos}
    speech={speech}
    // setVideo={setVideo}
    videoBasePath={videoBasePath}
  />
)
