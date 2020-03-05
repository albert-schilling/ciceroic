import { action } from '@storybook/addon-actions'
import { withKnobs, text, boolean } from '@storybook/addon-knobs'
import React, { useState } from 'react'

import App from '../../App'
import Video from './Video'
import VideoEvaluationForm from './VideoEvaluationForm'
import VideoEvaluationInputRange from './VideoEvaluationInputRange'
import GlobalStyle from '../../common/GlobalStyle'

const key = 'Gestures And Facial Expressions'
const name = 'Gestures And Facial Expressions'
const description = 'Use of body language to emphasise the content.'

const evaluation = {
  dimensions: {},
  evaluator: { firstName: '', lastName: '' },
  date: '',
}
const sectionStyles = {
  width: '100%',
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  gridGap: '24px',
}
const labelStyles = {
  color: 'red',
  width: '100%',
  gridGap: '8px',
  display: 'flex',
  flexDirection: 'column',
}

export default {
  title: 'Components/Video',
  decorators: [withKnobs],
  decorators: [
    withKnobs,
    storyFn => (
      <>
        <GlobalStyle />
        {/* <VideoEvaluationForm> */}
        <section style={sectionStyles}>{storyFn()}</section>
        {/* </VideoEvaluationForm> */}
      </>
    ),
  ],
  component: Video,
}

export const EvaluationInputRange = () => (
  <VideoEvaluationInputRange
    key={key}
    name={name}
    description={description}
    evaluation={evaluation}
    style={labelStyles}
    // setEvaluation={setEvaluation}
  />
)
