import { action } from '@storybook/addon-actions'
import React from 'react'
import { mobile } from '../../../common/storybookDecorator'
import ConfirmedAction from './ConfirmedAction'

export default {
  title: 'Components/Interfaces/ConfirmedAction',
  decorators: [storyFn => <section style={mobile}>{storyFn()}</section>],
  component: ConfirmedAction,
}

export const DefaultConfirmedAction = () => {
  return (
    <ConfirmedAction
      callback={action('Callback function invoked.')}
      message={{
        text: 'Update succesfull.',
        visible: true,
        style: 'confirmation',
      }}
    />
  )
}
