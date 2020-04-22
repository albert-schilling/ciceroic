import React from 'react'
import TextArea from './TextArea'
import { mobile } from '../../../common/storybookDecorator'

export default {
  title: 'Components/Inputs/TextArea',
  decorators: [storyFn => <section style={mobile}>{storyFn()}</section>],
  component: TextArea,
}

export const DefaultTextArea = () => {
  return <TextArea />
}
