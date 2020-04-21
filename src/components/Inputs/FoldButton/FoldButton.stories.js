import React from 'react'
import FoldButton from './FoldButton'
import { mobile } from '../../../common/storybookDecorator'
import { action } from '@storybook/addon-actions'

export default {
  title: 'Components/Inputs/Buttons/FoldButton',
  decorators: [storyFn => <section style={mobile}>{storyFn()}</section>],
  component: FoldButton,
}

export const DefaultFoldButton = () => {
  return <FoldButton callback={action('callback')} />
}
