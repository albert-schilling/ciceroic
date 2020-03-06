import React from 'react'
import styled from 'styled-components/macro'
import { NavLink } from 'react-router-dom'

export default function UserMessage({
  message,
  setMessage,
  // visibility,
  // setVisibility,
  // returnPath,
  // // messageCallback,
  // messageButtonRef,
  // messageReturnFocus,
  // clickHandler,
}) {
  console.log(message)
  console.log(message.focusRef)
  console.log(message.confirmHandler)
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
  `
  const MessageButton = styled.button`
    margin: 16px 0 4px 0;
    align-self: center;
    width: max-content;
    padding: 8px;
    background: var(--secondary-bg-color);
    text-align: center;
    color: var(--inverse-primary-font-color);
    text-decoration: none;

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
  // console.log(messageButtonRef)
  return (
    <MessageBody>
      <MessageText>{message.text}</MessageText>
      <MessageButton
        onClick={() => {
          setMessage({ ...message, visible: 'none' })
          message.confirmHandler(message.focusRef)
        }}
        // to={returnPath}
        // ref={messageButtonRef}
      >
        Okay
      </MessageButton>
    </MessageBody>
  )
}
