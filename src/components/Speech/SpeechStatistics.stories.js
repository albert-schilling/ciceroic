import { withKnobs } from '@storybook/addon-knobs'
import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import GlobalStyle from '../../common/GlobalStyle'
import SpeechStatistics from './SpeechStatistics'

const speech = {
  id: '1',
  category: 'Lecture',
  title: 'How to speak so that people want to listen',
  speaker: 'Julian Treasure',
  description:
    "Have you ever felt like you're talking, but nobody is listening? Here's Julian Treasure to help you fix that. As the sound expert demonstrates some useful vocal exercises and shares tips on how to speak with empathy, he offers his vision for a sonorous world of listening and understanding.",
  date: 'Jun 27, 2014',
  duration: '9.58',
  filename: 'How to speak so that people want to listen _ Julian Treasure.mp4',
  evaluations: [
    {
      dimensions: {
        'Gestures And Facial Expressions': 4,
        'Pronounciation and Vocal Variety': 2,
        'Comprehensibility and Structure': 2,
        'Stylistic Devices': 2,
        'Credible and Convincing': 4,
      },
      evaluator: {
        firstName: 'TestNr468105',
        lastName: 'TestNr259065',
      },
      date: 1583697398446,
    },
    {
      dimensions: {
        'Gestures And Facial Expressions': 3,
        'Pronounciation and Vocal Variety': 1,
        'Comprehensibility and Structure': 5,
        'Stylistic Devices': 1,
        'Credible and Convincing': 1,
      },
      evaluator: {
        firstName: 'TestNr968224',
        lastName: 'TestNr113765',
      },
      date: 1583697434241,
    },
    {
      dimensions: {
        'Gestures And Facial Expressions': 4,
        'Pronounciation and Vocal Variety': 4,
        'Comprehensibility and Structure': 3,
        'Stylistic Devices': 1,
        'Credible and Convincing': 4,
      },
      evaluator: {
        firstName: 'TestNr138784',
        lastName: 'TestNr751496',
      },
      date: 1583697434350,
    },
    {
      dimensions: {
        'Gestures And Facial Expressions': 2,
        'Pronounciation and Vocal Variety': 3,
        'Comprehensibility and Structure': 1,
        'Stylistic Devices': 1,
        'Credible and Convincing': 4,
      },
      evaluator: {
        firstName: 'TestNr266933',
        lastName: 'TestNr18944',
      },
      date: 1583697454062,
    },
    {
      dimensions: {
        'Gestures And Facial Expressions': 5,
        'Pronounciation and Vocal Variety': 1,
        'Comprehensibility and Structure': 3,
        'Stylistic Devices': 3,
        'Credible and Convincing': 2,
      },
      evaluator: {
        firstName: 'TestNr508415',
        lastName: 'TestNr213347',
      },
      date: 1583697479512,
    },
  ],
}

const sectionStyles = {
  padding: '20px',
}

export default {
  title: 'Components/SpeechStatistics',
  decorators: [
    withKnobs,
    storyFn => (
      <>
        <GlobalStyle />
        <section style={sectionStyles}>{storyFn()}</section>
      </>
    ),
  ],
  component: SpeechStatistics,
}

export const StandardSpeechStatistics = () => {
  return <SpeechStatistics speech={speech} />
}
