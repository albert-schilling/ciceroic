import React from 'react'
import { mobile } from '../../common/storybookDecorator'
import Spinner from './Spinner'

export default {
  title: 'Components/Utils/Spinner',
  decorators: [storyFn => <section style={mobile}>{storyFn()}</section>],
  component: Spinner,
}

export const DefaultSpinner = () => {
  return <Spinner />
}
