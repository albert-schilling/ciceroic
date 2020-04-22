import React from 'react'
import { mobile } from '../../common/storybookDecorator'
import Evaluation from './Evaluation'
import exampleEvaluation from '../../data/exampleEvaluation'

export default {
  title: 'Components/Evaluation/Evaluation',
  decorators: [storyFn => <section style={mobile}>{storyFn()}</section>],
  component: Evaluation,
}

export const EvaluationByUser = () => {
  return (
    <Evaluation evaluation={exampleEvaluation} user={{ _id: 'evaluatorxyz' }} />
  )
}

export const EvaluationByOtherUser = () => {
  return <Evaluation evaluation={exampleEvaluation} />
}
