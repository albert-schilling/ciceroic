import React from 'react'
import { mobile } from '../../common/storybookDecorator'
import SignInForm from './SignInForm'

export default {
  title: 'Components/Forms/SignInForm',
  decorators: [storyFn => <section style={mobile}>{storyFn()}</section>],
  component: SignInForm,
}

export const DefaultSignInForm = () => {
  return <SignInForm profile={{}} setProfile={() => {}} />
}
