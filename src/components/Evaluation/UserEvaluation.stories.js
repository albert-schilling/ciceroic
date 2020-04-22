import React from 'react'
import UserEvaluation from './UserEvaluation'
import { mobile } from '../../common/storybookDecorator'
import { action } from '@storybook/addon-actions'
import exampleSpeech from '../../data/exampleSpeech'

export default {
  title: 'Components/Evaluation/UserEvaluation',
  decorators: [storyFn => <section style={mobile}>{storyFn()}</section>],
  component: UserEvaluation,
}

const user = { _id: 'evaluatorxyz' }

export const StandardUserEvaluation = () => {
  return <UserEvaluation speech={exampleSpeech} user={user} />
}

// speech,
// setSpeech,
// user,
// profile,
// message,
// setMessage,
