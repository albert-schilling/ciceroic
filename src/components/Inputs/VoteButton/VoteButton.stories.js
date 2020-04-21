import React from 'react'
import VoteButton from './VoteButton'
import { mobile } from '../../../common/storybookDecorator'
import { action } from '@storybook/addon-actions'

export default {
  title: 'Components/Inputs/Buttons/VoteButton',
  decorators: [storyFn => <section style={mobile}>{storyFn()}</section>],
  component: VoteButton,
}

export const DefaultVoteButton = () => {
  return <VoteButton clickHandler={action('callback')} />
}
