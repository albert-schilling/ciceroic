import React from 'react'
import TextArea from './TextArea'

const sectionStyles = {
  padding: '20px',
}

const evaluation = {
  dimensions: {},
  evaluator: { firstName: '', lastName: '' },
  date: '',
  praise: '',
  suggestions: '',
}

export default {
  title: 'Components/Inputs/TextArea',
  decorators: [storyFn => <section style={sectionStyles}>{storyFn()}</section>],
  component: TextArea,
}

export const DefaultTextArea = () => {
  return <TextArea title="Default TextArea" evaluation={evaluation} />
}
