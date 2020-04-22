import React from 'react'
import SpeechStatistics from './SpeechStatistics'
import { mobile } from '../../../common/storybookDecorator'
import exampleSpeech from '../../../data/exampleSpeech'

export default {
  title: 'Components/Speech/SpeechStatistics',
  decorators: [storyFn => <section style={mobile}>{storyFn()}</section>],
  component: SpeechStatistics,
}

export const StandardSpeechStatistics = () => {
  return <SpeechStatistics speech={exampleSpeech} />
}
