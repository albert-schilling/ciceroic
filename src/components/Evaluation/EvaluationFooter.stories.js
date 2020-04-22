import React from 'react'
import EvaluationFooter from './EvaluationFooter'
import { mobile } from '../../common/storybookDecorator'
import exampleEvaluation from '../../data/exampleEvaluation'

export default {
  title: 'Components/Evaluation/Footer',
  decorators: [storyFn => <section style={mobile}>{storyFn()}</section>],
  component: EvaluationFooter,
}

export const DefaultEvaluationFooter = () => {
  return <EvaluationFooter evaluation={exampleEvaluation} />
}
