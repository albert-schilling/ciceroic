import React from 'react'
import { mobile } from '../../common/storybookDecorator'
import Comment from './Comment'
import exampleEvaluation from '../../data/exampleEvaluation'

export default {
  title: 'Components/Evaluation/Comment',
  decorators: [storyFn => <section style={mobile}>{storyFn()}</section>],
  component: Comment,
}

const content =
  'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.'

export const DefaultComment = () => {
  return <Comment header={'Title'} content={content} />
}
