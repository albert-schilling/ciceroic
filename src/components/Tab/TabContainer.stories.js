import React from 'react'
import TabContainer from './TabContainer'

const sectionStyles = {
  padding: '20px',
}

export default {
  title: 'Components/TabContainer',
  decorators: [storyFn => <section style={sectionStyles}>{storyFn()}</section>],
  component: TabContainer,
}

export const StandardTabContainer = () => {
  return <TabContainer />
}
