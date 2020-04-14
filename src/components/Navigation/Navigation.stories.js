import React from 'react'
import Navigation from './Navigation'
import { mobile } from '../../common/storybookDecorator'

export default {
  title: 'Components/Navigation',
  decorators: [storyFn => <section style={mobile}>{storyFn()}</section>],
  component: Navigation,
}

export const DefaultNavigation = () => {
  return <Navigation user={{ _id: 'id123' }} />
}
