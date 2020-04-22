import React from 'react'
import { mobile } from '../../common/storybookDecorator'
import LandingPage from './LandingPage'

export default {
  title: 'Components/Pages/LandingPage',
  decorators: [storyFn => <section style={mobile}>{storyFn()}</section>],
  component: LandingPage,
}

export const DefaultLandingPage = () => {
  return <LandingPage profile={{}} setProfile={() => {}} />
}
