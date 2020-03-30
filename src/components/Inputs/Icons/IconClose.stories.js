import React from 'react'
import IconClose from './IconClose'
import { mobile } from '../../../common/storybookDecorator'

import { action } from '@storybook/addon-actions'

export default {
  title: 'Components/Inputs/Icons',
  decorators: [storyFn => <section style={mobile}>{storyFn()}</section>],
  component: IconClose,
}

export const DefaultIconClose = () => {
  return <IconClose callback={action('Close page or message.')} />
}
