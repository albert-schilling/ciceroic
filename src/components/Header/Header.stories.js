import React from 'react'
import Header from './Header'
import { mobile } from '../../common/storybookDecorator'

export default {
  title: 'Components/Header',
  decorators: [storyFn => <section style={mobile}>{storyFn()}</section>],
  component: Header,
}
export const DefaultHeader = () => {
  return <Header />
}
