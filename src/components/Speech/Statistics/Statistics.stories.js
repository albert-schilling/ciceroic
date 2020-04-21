import React from 'react'
import Statistics from './Statistics'
import { mobile } from '../../../common/storybookDecorator'
import evaluationDimensions from '../../../data/evaluationDimensions'

export default {
  title: 'Components/Speech/Statistics',
  decorators: [storyFn => <section style={mobile}>{storyFn()}</section>],
  component: Statistics,
}

export const StandardStatistics = () => {
  return <Statistics dimensions={evaluationDimensions} />
}
