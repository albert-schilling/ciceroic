import React from 'react'
import styled from 'styled-components/macro'

export default function UserMessage({ message, setMessage }) {
  const MessageBody = styled.article`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: ${message.visible};
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
    &:focus {
      box-shadow: 10px 10px 10px red;
    }
  `
  const MessageText = styled.p`
    width: 80%;
    font-size: 1.2rem;
    line-height: 1.6rem;
    word-wrap: break-word;
  `
  return (
    <MessageBody>
      <MessageText>{message.text}</MessageText>
      <MessageInputButton
        onClick={() => {
          setMessage({ ...message, visible: 'none' })
          message.confirmHandler(message.focusRef)
        }}
        ref={message.buttonRef}
      >
        Okay
      </MessageInputButton>
    </MessageBody>
  )
}
