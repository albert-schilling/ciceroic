import React from 'react'
import Tab from './Tab'

const sectionStyles = {
  padding: '20px',
}

export default {
  title: 'Components/Tab',
  decorators: [storyFn => <section style={sectionStyles}>{storyFn()}</section>],
  component: Tab,
}

export const DefaultTab = () => {
  return <Tab title="Evaluate" />
}
