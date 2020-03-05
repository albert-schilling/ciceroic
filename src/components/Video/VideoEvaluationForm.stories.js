import { action } from '@storybook/addon-actions'
import { withKnobs, text, boolean } from '@storybook/addon-knobs'
import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Video from './Video'
import VideoEvaluationForm from './VideoEvaluationForm'

import GlobalStyle from '../../common/GlobalStyle'

const evaluation = {
  dimensions: {},
  evaluator: { firstName: '', lastName: '' },
  date: '',
}
const videoBasePath = '/videos/'

const video = {
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
  title: 'Components/Video',
  decorators: [
    withKnobs,
    storyFn => (
      <Router>
        <GlobalStyle />

        <Video
          // videos={videos}
          video={video}
          // setVideo={setVideo}
          videoBasePath={videoBasePath}
        >
          {storyFn()}
        </Video>
      </Router>
    ),
  ],
  component: Video,
}

export const VideoEvaluation = () => {
  return (
    <VideoEvaluationForm
      evaluation={evaluation}
      // setEvaluation={setEvaluation}
      // handleSubmit={handleSubmit}
    />
  )
}
