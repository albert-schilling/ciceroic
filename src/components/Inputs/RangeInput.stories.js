import React from 'react'
import GlobalStyle from '../../common/GlobalStyle'
import RangeInput from './RangeInput'

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

export default {
  title: 'Components/Inputs',
  decorators: [
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
