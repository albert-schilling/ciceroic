import React from 'react'
import TextAreaInlineLabel from './TextAreaInlineLabel'
import { mobile } from '../../common/storybookDecorator'

export default {
  title: 'Components/Inputs/TextAreaInlineLabel',
  decorators: [storyFn => <section style={mobile}>{storyFn()}</section>],
  component: TextAreaInlineLabel,
}

export const DefaultTextAreaInlineLabel = () => {
  return <TextAreaInlineLabel />
}
