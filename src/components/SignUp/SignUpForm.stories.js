import { action } from '@storybook/addon-actions'
import React from 'react'
import { mobile } from '../../common/storybookDecorator'
import SignUpForm from './SignUpForm'

export default {
  title: 'Components/Forms/SignUpForm',
  decorators: [storyFn => <section style={mobile}>{storyFn()}</section>],
  component: SignUpForm,
}

export const DefaultSignUpForm = () => {
  return (
    <SignUpForm
      profile={{}}
      setProfile={() => {}}
      history={{ push: action('Go back to login screen') }}
    />
  )
}
