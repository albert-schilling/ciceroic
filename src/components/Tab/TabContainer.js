import React, { useState } from 'react'
import styled from 'styled-components/macro'
import Tab from './Tab'

export default function TabContainer() {
  const [activeTab, setActiveTab] = useState('')

  return (
    <TabContainerStyled>
      <Tab
        handleClick={handleClick}
        activeTab={activeTab}
        active={true}
        title="Evaluate"
      >
        <div>
          <h4>Tab 1 Content</h4>
          <p>Comp renders this text, has no props and no state.</p>
        </div>
      </Tab>
      <Tab handleClick={handleClick} activeTab={activeTab} title="Statistics">
        <div>
          <h4>Tab 2 Content</h4>
          <p>Comp renders this text, has no props and no state.</p>
        </div>
      </Tab>
    </TabContainerStyled>
  )
  function handleClick(ref) {
    setActiveTab(ref)
  }
}

const TabContainerStyled = styled.section`
  display: flex;
  flex-wrap: wrap;
`
