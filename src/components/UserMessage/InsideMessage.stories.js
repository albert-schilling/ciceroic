import React from 'react'
import InsideMessage from './InsideMessage'
import { mobile } from '../../common/storybookDecorator'

export default {
  title: 'Components/Message/InsideMessage',
  decorators: [storyFn => <section style={mobile}>{storyFn()}</section>],
  component: InsideMessage,
}

export const DefaultInsideMessage = () => {
  return (
    <InsideMessage
      message={{ visible: true, text: 'Storybook test message.' }}
    />
  )
}
export const WarningInsideMessage = () => {
  return (
    <InsideMessage
      message={{
        visible: true,
        text: 'Storybook test message.',
        style: 'warning',
      }}
    />
  )
}
export const ConfirmationInsideMessage = () => {
  return (
    <InsideMessage
      message={{
        visible: true,
        text: 'Storybook test message.',
        style: 'confirmation',
      }}
    />
  )
}
