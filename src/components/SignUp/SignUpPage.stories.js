import { action } from '@storybook/addon-actions'
import React from 'react'
import { mobile } from '../../common/storybookDecorator'
import SignUpPage from './SignUpPage'

export default {
  title: 'Components/Pages/SignUpPage',
  decorators: [storyFn => <section style={mobile}>{storyFn()}</section>],
  component: SignUpPage,
}

export const DefaultSignUpForm = () => {
  return <SignUpPage profile={{}} setProfile={() => {}} />
}
