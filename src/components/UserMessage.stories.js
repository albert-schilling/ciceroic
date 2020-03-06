import { action } from '@storybook/addon-actions'
import { withKnobs, text, boolean } from '@storybook/addon-knobs'
import React, { useState, useRef } from 'react'

import GlobalStyle from '../common/GlobalStyle'
import UserMessage from './UserMessage'

const message = {
  visible: 'flex',
  text: 'Hello, this is a message.',
  buttonRef: null,
  confirmHandler: () => {},
  focusRef: null,
}

export default {
  title: 'Components/Video',
  decorators: [
    withKnobs,
    storyFn => (
      <>
        <GlobalStyle />
        {storyFn()}
      </>
    ),
  ],
  component: UserMessage,
}

export const StandardUserMessage = () => <UserMessage message={message} />
