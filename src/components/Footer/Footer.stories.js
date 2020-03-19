import React from 'react'
import Footer from './Footer'
import { mobile } from '../../common/storybookDecorator'

export default {
  title: 'Components/Footer',
  decorators: [storyFn => <section style={mobile}>{storyFn()}</section>],
  component: Footer,
}

export const DefaultFooter = () => {
  return <Footer user={{ id: 'id123' }} />
}
