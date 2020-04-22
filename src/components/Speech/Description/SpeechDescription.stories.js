import React from 'react'
import SpeechDescription from './SpeechDescription'
import { mobile } from '../../../common/storybookDecorator'
import exampleSpeech from '../../../data/exampleSpeech'

export default {
  title: 'Components/Speech/Description',
  decorators: [storyFn => <section style={mobile}>{storyFn()}</section>],
  component: SpeechDescription,
}

export const DefaultSpeechDescription = () => {
  return (
    <SpeechDescription
      title={exampleSpeech.title}
      speaker={exampleSpeech.speaker}
      description={exampleSpeech.description}
      category={exampleSpeech.category}
      duration={exampleSpeech.duration}
      date={'Thursday, 2 April 2020'}
    />
  )
}
