import { action } from '@storybook/addon-actions'
import { withKnobs, text, boolean } from '@storybook/addon-knobs'
import React from 'react'
import App from './App'

export default {
  title: 'Components/App',
  decorators: [withKnobs],
  component: App,
}

export const StandardApp = () => <App />
