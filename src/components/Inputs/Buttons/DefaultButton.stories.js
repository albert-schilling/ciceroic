import React from 'react'
import DefaultButton from './DefaultButton'
import { mobile, desktop } from '../../common/storybookDecorator'

export default {
  title: 'Components/Inputs/Buttons/DefaultButton',
  decorators: [storyFn => <section style={mobile}>{storyFn()}</section>],
  component: DefaultButton,
}

export const PrimaryButton = () => {
  return <DefaultButton color="primary" />
}
export const SecondaryButton = () => {
  return <DefaultButton color="secondary" />
}
export const TertiaryButton = () => {
  return <DefaultButton color="tertiary" />
}
