import React, { useState } from 'react'
import Tab from './Tab'
import { mobile } from '../../../common/storybookDecorator'
import { action } from '@storybook/addon-actions'

export default {
  title: 'Components/Interfaces/Tab',
  decorators: [storyFn => <section style={mobile}>{storyFn()}</section>],
  component: Tab,
}

export const DefaultTab = () => {
  const [activeTab, setActiveTab] = useState('')

  return (
    <Tab
      title="Evaluate"
      handleClick={handleClick}
      activeTab={activeTab}
      active={true}
      title="Evaluate"
    >
      Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
      eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
      voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
      clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
      amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
      nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed
      diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
      Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor
      sit amet.
    </Tab>
  )
  function handleClick(ref) {
    setActiveTab(ref)
  }
}
