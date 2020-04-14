import React from 'react'
import { mobile } from '../../../common/storybookDecorator'
import ConfirmedAction from './ConfirmedAction'
import { action } from '@storybook/addon-actions'

export default {
  title: 'Components/Interfaces/ConfirmedAction',
  decorators: [storyFn => <section style={mobile}>{storyFn()}</section>],
  component: ConfirmedAction,
}

export const DefaultConfirmedAction = () => {
  return <ConfirmedAction callback={action('Callback function invoked.')} />
}
