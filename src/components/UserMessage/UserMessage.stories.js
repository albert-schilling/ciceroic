import React from 'react'
import { action } from '@storybook/addon-actions'
import UserMessage from './UserMessage'

const message = {
  visible: 'flex',
  text: 'Hello, this is a message.',
  buttonRef: null,
  confirmHandler: () => {},
  focusRef: null,
}

export default {
  title: 'Components/Message',
  component: UserMessage,
}

export const StandardUserMessage = () => (
  <UserMessage
    message={message}
    handleClick={action('Confirm/close message.')}
  />
)
