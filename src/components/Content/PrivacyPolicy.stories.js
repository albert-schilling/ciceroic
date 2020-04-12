import React from 'react'
import { desktop } from '../../common/storybookDecorator'
import PrivacyPolicy from './PrivacyPolicy'

export default {
  title: 'Components/Interfaces/PrivacyPolicy',
  decorators: [storyFn => <section style={desktop}>{storyFn()}</section>],
  component: PrivacyPolicy,
}

export const DefaultPrivacyPolicy = () => {
  return <PrivacyPolicy />
}
