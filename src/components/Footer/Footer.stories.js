import React from 'react'
import { mobile } from '../../common/storybookDecorator'
import Footer from './Footer'

export default {
  title: 'Components/Footer',
  decorators: [storyFn => <section style={mobile}>{storyFn()}</section>],
  component: Footer,
}

export const DefaultFooter = () => {
  return <Footer />
}
