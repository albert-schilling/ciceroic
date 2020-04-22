import React from 'react'
import { desktop } from '../../common/storybookDecorator'
import Terms from './Terms'

export default {
  title: 'Components/Pages/Terms',
  decorators: [storyFn => <section style={desktop}>{storyFn()}</section>],
  component: Terms,
}

export const DefaultTerms = () => {
  return <Terms />
}
