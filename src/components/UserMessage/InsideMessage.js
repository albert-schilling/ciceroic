import React from 'react'
import styled from 'styled-components/macro'

export default function InsideMessage({
  message = { visible: true, text: 'Default InsideMessage text', style: '' },
}) {
  return (
    <>
      {message.visible && (
        <Message className={message.style}>{message.text}</Message>
      )}{' '}
    </>
  )
}

const Message = styled.p`
  margin: 0;
  border: 1px solid var(--highlight-color);
  width: 100%;
  padding: 20px;
  color: var(--highlight-color);
  line-height: 1.4rem;
  &.confirmation {
    border: 1px solid green;
    color: green;
  }
  &.warning {
    border: 1px solid var(--secondary-highlight-color);
    color: var(--secondary-highlight-color);
  }
`
