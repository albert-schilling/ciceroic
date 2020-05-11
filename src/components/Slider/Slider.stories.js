import React from 'react'
import { mobile } from '../../common/storybookDecorator'
import Slider from './Slider'
import exampleSpeeches from '../../data/exampleSpeeches'

export default {
  title: 'Components/Slider',
  decorators: [storyFn => <section style={mobile}>{storyFn()}</section>],
  component: Slider,
}

export const SpeechSlider = () => {
  return <Slider speeches={exampleSpeeches} />
}
