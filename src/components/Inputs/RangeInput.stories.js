import { withKnobs } from '@storybook/addon-knobs'
import React from 'react'

import RangeInput from './RangeInput'
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
  gridGap: '8px',
  display: 'flex',
  flexDirection: 'column',
}

export default {
  title: 'Components/Inputs',
  decorators: [
    withKnobs,
    storyFn => (
      <>
        <GlobalStyle />
        <section style={sectionStyles}>{storyFn()}</section>
      </>
    ),
  ],
  component: RangeInput,
}

export const StandardRangeInput = () => (
  <RangeInput
    key={key}
    name={name}
    description={description}
    evaluation={evaluation}
  />
)
