import React from 'react'
import Speech from './Speech'
import { mobile } from '../../common/storybookDecorator'
import { actions, action } from '@storybook/addon-actions'
import exampleSpeech from '../../data/exampleSpeech'

export default {
  title: 'Components/Speech',
  decorators: [storyFn => <section style={mobile}>{storyFn()}</section>],
  component: Speech,
}

export const SpeechSeenAsSpeaker = () => (
  <Speech
    speech={exampleSpeech}
    activePage={'/speech'}
    user={{ _id: 'speakerxyz' }}
  />
)

export const SpeechSeenAsEvaluator = () => (
  <Speech
    speech={exampleSpeech}
    activePage={'/speech'}
    user={{ _id: 'evaluatorxyz' }}
  />
)
