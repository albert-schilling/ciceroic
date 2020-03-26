import React from 'react'
import Select from './Select'
import { mobile } from '../../../common/storybookDecorator'

export default {
  title: 'Components/Inputs/Select',
  decorators: [storyFn => <section style={mobile}>{storyFn()}</section>],
  component: Select,
}

export const DefaultSelect = () => {
  return <Select />
}
