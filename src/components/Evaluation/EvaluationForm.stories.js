import React from 'react'
import EvaluationForm from './EvaluationForm'
import { mobile } from '../../common/storybookDecorator'
import { action } from '@storybook/addon-actions'
import exampleEvaluation from '../../data/exampleEvaluation'

export default {
  title: 'Components/Evaluation/EvaluationForm',
  decorators: [storyFn => <section style={mobile}>{storyFn()}</section>],
  component: EvaluationForm,
}

export const StandardEvaluationForm = () => {
  return (
    <EvaluationForm
      evaluation={exampleEvaluation}
      handleSubmit={action('Evaluation submitted')}
    />
  )
}
