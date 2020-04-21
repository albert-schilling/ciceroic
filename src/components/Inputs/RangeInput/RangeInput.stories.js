import React from 'react'
import { mobile } from '../../../common/storybookDecorator'
import RangeInput from './RangeInput'

const key = 'Gestures And Facial Expressions'
const name = 'Gestures And Facial Expressions'
const description = 'Use of body language to emphasise the content.'
const evaluation = {
  dimensions: {},
  evaluator: { firstName: '', lastName: '' },
  date: '',
}

export default {
  title: 'Components/Inputs/RangeInput',
  decorators: [
    storyFn => (
      <>
        <section style={mobile}>{storyFn()}</section>
      </>
    ),
  ],
  component: RangeInput,
}

export const DefaultRangeInput = () => (
  <RangeInput
    key={key}
    name={name}
    description={description}
    evaluation={evaluation}
  />
)
