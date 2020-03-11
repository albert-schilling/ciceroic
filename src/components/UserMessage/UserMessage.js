import React from 'react'
import styled from 'styled-components/macro'

export default function UserMessage({ message, handleClick }) {
  return (
    <MessageBody>
      <MessageText>{message.text}</MessageText>
      <MessageInputButton
        autoFocus
        type="submit"
        onClick={handleClick}
        name="confirmation"
      >
        Okay
      </MessageInputButton>
    </MessageBody>
  )
}

const MessageBody = styled.article`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: var(--primary-bg-color);
  color: var(--inverse-primary-font-color);
  @media (min-width: 700px) {
    max-width: 400px;
    max-height: 800px;
    max-width: 400px;
    max-height: 40%;
    left: calc(50% - 200px);
    top: 30%;
  }
`

const MessageInputButton = styled.button`
  margin: 16px 0 24px 0;
  align-self: center;
  width: max-content;
  border: none;
  padding: 8px;
  background: var(--secondary-bg-color);
  text-align: center;
  font-size: 1rem;
  color: var(--inverse-primary-font-color);
  text-decoration: none;
  cursor: pointer;
`
const MessageText = styled.p`
  width: 80%;
  font-size: 1.2rem;
  line-height: 1.6rem;
  word-wrap: break-word;
`
