import React, { useRef, useEffect } from 'react'
import styled from 'styled-components/macro'

export default function Tab({
  activeTab = {},
  handleClick = () => {},
  children = {},
  title = 'Default Tab Title',
  active = false,
}) {
  const reference = useRef(null)
  useEffect(() => {
    active && handleClick(reference)
  }, [active])
  return (
    <>
      <TabTitle
        ref={reference}
        className={reference === activeTab ? 'active' : ''}
        onClick={() => {
          handleClick(reference)
        }}
      >
        {title}
      </TabTitle>
      <TabBody>{reference === activeTab ? children : ''}</TabBody>
    </>
  )
}

const TabTitle = styled.button`
  order: 1;
  width: 50%;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  font-size: 1rem;
  background: var(--light-grey);
  color: var(--primary-font-color);
  &.active {
    background: var(--highlight-color);
    color: var(--inverse-primary-font-color);
  }
`

const TabBody = styled.section`
  order: 2;
  width: 100%;
  display: grid;
  grid-gap: 12px;
  justify-content: center;
  @media (min-width: 700px) {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: 20px;
    > *:nth-child(n) {
      width: calc(50% - 10px);
      margin-bottom: 20px;
    }
  }
`
