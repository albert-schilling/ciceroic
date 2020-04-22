import React from 'react'
import TabContainer from './TabContainer'
import { mobile } from '../../../common/storybookDecorator'

export default {
  title: 'Components/Interfaces/TabContainer',
  decorators: [storyFn => <section style={mobile}>{storyFn()}</section>],
  component: TabContainer,
}

export const StandardTabContainer = () => {
  return <TabContainer />
}
