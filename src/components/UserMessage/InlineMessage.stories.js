import React from 'react'
import InlineMessage from './InlineMessage'
import { mobile } from '../../common/storybookDecorator'

export default {
  title: 'Components/Message/InlineMessage',
  decorators: [storyFn => <section style={mobile}>{storyFn()}</section>],
  component: InlineMessage,
}

export const VariousInlineMessageStyles = () => {
  return (
    <>
      <InlineMessage
        message={{ visible: true, text: 'default inline message.' }}
      />
      <InlineMessage
        message={{
          visible: true,
          text: 'inline message with style: "warning".',
          style: 'warning',
        }}
      />
      <InlineMessage
        message={{
          visible: true,
          text: 'inline message with style: "confirmation".',
          style: 'confirmation',
        }}
      />
    </>
  )
}
