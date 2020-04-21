import React from 'react'
import SpeechesList from './SpeechesList'
import { mobile } from '../../common/storybookDecorator'
import exampleSpeech from '../../data/exampleSpeech'

export default {
  title: 'Components/Speech/List',
  decorators: [storyFn => <section style={mobile}>{storyFn()}</section>],
  component: SpeechesList,
}
const speeches = [exampleSpeech, exampleSpeech, exampleSpeech]
export const DefaultSpeechesList = () => {
  return <SpeechesList speeches={speeches} />
}
