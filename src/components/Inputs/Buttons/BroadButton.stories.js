import React from 'react'
import { mobile } from '../../../common/storybookDecorator'
import BroadButton from './BroadButton'

export default {
  title: 'Components/Inputs/Buttons/BroadButton',
  decorators: [storyFn => <section style={mobile}>{storyFn()}</section>],
  component: BroadButton,
}

export const PrimaryButton = () => {
  return <BroadButton color="primary" />
}
export const SecondaryButton = () => {
  return <BroadButton color="secondary" />
}
export const TertiaryButton = () => {
  return <BroadButton color="tertiary" />
}
export const NoMarginButton = () => {
  return <BroadButton styling="m0" />
}
