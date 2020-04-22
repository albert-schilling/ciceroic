import React from 'react'
import { desktop } from '../../common/storybookDecorator'
import Imprint from './Imprint'

export default {
  title: 'Components/Pages/Imprint',
  decorators: [storyFn => <section style={desktop}>{storyFn()}</section>],
  component: Imprint,
}

export const DefaultImprint = () => {
  return <Imprint />
}
