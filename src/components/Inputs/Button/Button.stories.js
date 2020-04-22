import React from 'react'
import Button from './Button'
import { mobile } from '../../../common/storybookDecorator'
import { action } from '@storybook/addon-actions'

export default {
  title: 'Components/Inputs/Buttons/Button',
  decorators: [storyFn => <section style={mobile}>{storyFn()}</section>],
  component: Button,
}

export const PrimaryButton = () => {
  return <Button styling="primary" callback={action('callback')} />
}
export const SecondaryButton = () => {
  return <Button styling="secondary" callback={action('callback')} />
}
export const TertiaryButton = () => {
  return <Button styling="tertiary" callback={action('callback')} />
}
export const NoMarginButton = () => {
  return <Button styling="m0" callback={action('callback')} />
}
export const FullWidthButton = () => {
  return <Button styling="full-width" callback={action('callback')} />
}
