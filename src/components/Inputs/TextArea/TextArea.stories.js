import React from 'react'
import TextArea from './TextArea'
import { mobile } from '../../../common/storybookDecorator'

const evaluation = {
  dimensions: {},
  evaluator: { firstName: '', lastName: '' },
  date: '',
  praise: '',
  suggestions: '',
}

export default {
  title: 'Components/Inputs/TextArea',
  decorators: [storyFn => <section style={mobile}>{storyFn()}</section>],
  component: TextArea,
}

export const DefaultTextArea = () => {
  return <TextArea title="Default TextArea" evaluation={evaluation} />
}
