import React, { useRef, useEffect } from 'react'
import styled from 'styled-components/macro'

export default function Tab({
  activeTab,
  handleClick,
  children,
  title,
  active,
}) {
  const reference = useRef(null)
  useEffect(() => {
    active && handleClick(reference)
  }, [active, handleClick])
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
  background: lightblue;
  font-size: 1rem;
  background: #eee;
  color: #aaa;
  &.active {
    background: navy;
    color: #fff;
  }
`

const TabBody = styled.section`
  order: 2;
  width: 100%;
  display: flex;
  justify-content: center;
`
