import React from 'react'
import { mobile } from '../../common/storybookDecorator'
import CommunityEvaluations from './CommunityEvaluations'
import exampleSpeech from '../../data/exampleSpeech'

export default {
  title: 'Components/Evaluation/CommunityEvaluations',
  decorators: [storyFn => <section style={mobile}>{storyFn()}</section>],
  component: CommunityEvaluations,
}

export const DefaultCommunityEvaluations = () => {
  return (
    <CommunityEvaluations speech={exampleSpeech} user={{ _id: 'speakerxyz' }} />
  )
}
