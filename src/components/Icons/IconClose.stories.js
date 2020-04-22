import React from 'react'
import IconClose from './IconClose'

import { action } from '@storybook/addon-actions'

export default {
  title: 'Components/Icons/Close',
  component: IconClose,
}

export const DefaultIconClose = () => {
  return <IconClose callback={action('Close page or message.')} />
}
