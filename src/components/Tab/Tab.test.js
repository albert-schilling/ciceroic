import { render } from '@testing-library/react'
import React, { useState } from 'react'
import styled from 'styled-components/macro'
import Tab from './Tab'
import useTab from '../../hooks/useTab'
// {
//   const { activeTab, setActiveTab, handleClick } = useTab()
// }
const [activeTab, setActiveTab] = useState('')
function handleClick(ref) {
  setActiveTab(ref)
}
test.only('renders the first Tab', async (activeTab, setActiveTab, handleClick) => {
  const { getByText } = render(
    <TabContainerStyled>
      <Tab
        handleClick={handleClick}
        activeTab={activeTab}
        active={true}
        title="Evaluate"
      >
        <p>TabBody renders this text.</p>
      </Tab>
    </TabContainerStyled>
  )
  const TabTitle = getByText(/Evaluate/i)
  const TabBody = getByText('TabBody renders this text')
  expect(TabTitle).toBeInTheDocument()
  expect(TabBody).toBeInTheDocument()
})
const TabContainerStyled = styled.section`
  display: flex;
  flex-wrap: wrap;
`
