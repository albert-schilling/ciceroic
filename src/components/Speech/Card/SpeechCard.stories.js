import React from 'react'
import SpeechCard from './SpeechCard'
import { mobile } from '../../../common/storybookDecorator'
import exampleSpeech from '../../../data/exampleSpeech'

export default {
  title: 'Components/Speech/Card',
  decorators: [storyFn => <section style={mobile}>{storyFn()}</section>],
  component: SpeechCard,
}

export const StandardSpeechCard = () => (
  <SpeechCard key={exampleSpeech._id} speech={exampleSpeech} />
)
