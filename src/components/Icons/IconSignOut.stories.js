import React from 'react'
import IconSignOut from './IconSignOut'
import { mobile } from '../../common/storybookDecorator'

import { action } from '@storybook/addon-actions'

export default {
  title: 'Components/Icons/SignOut',
  decorators: [storyFn => <section style={mobile}>{storyFn()}</section>],
  component: IconSignOut,
}

export const DefaultIconSignOut = () => {
  return <IconSignOut callback={action('User will be logged out.')} />
}
