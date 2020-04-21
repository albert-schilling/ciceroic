import React from 'react'
import { mobile } from '../../../common/storybookDecorator'
import Button from './Button'

export default {
  title: 'Components/Inputs/Buttons/Button',
  decorators: [storyFn => <section style={mobile}>{storyFn()}</section>],
  component: Button,
}

export const PrimaryButton = () => {
  return <Button styling="primary" />
}
export const SecondaryButton = () => {
  return <Button styling="secondary" />
}
export const TertiaryButton = () => {
  return <Button styling="tertiary" />
}
export const NoMarginButton = () => {
  return <Button styling="m0" />
}
export const FullWidthButton = () => {
  return <Button styling="full-width" />
}
