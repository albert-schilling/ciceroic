import React from 'react'
import SpeechThumbnail from './SpeechThumbnail'
import { mobile } from '../../../common/storybookDecorator'
import exampleSpeech from '../../../data/exampleSpeech'

export default {
  title: 'Components/Speech/Thumbnail',
  decorators: [storyFn => <section style={mobile}>{storyFn()}</section>],
  component: SpeechThumbnail,
}

export const StandardSpeechThumbnail = () => (
  <SpeechThumbnail key={exampleSpeech._id} speech={exampleSpeech} />
)
