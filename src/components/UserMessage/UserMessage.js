import React from 'react'
import styled from 'styled-components/macro'
import Button from '../Inputs/Button/Button'

export default function UserMessage({
  message = {
    visible: 'flex',
    text: 'Hello, this is a message.',
    buttonRef: null,
    confirmHandler: () => {},
    focusRef: null,
  },
  handleClick,
}) {
  return (
    <MessageBody>
      <MessageText>{message.text}</MessageText>

      <Button
        name="confirmation"
        callback={handleClick}
        text="Okay"
        styling="primary"
        type="submit"
        autoFocus={true}
      />
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
  background: var(--light-grey);
  color: var(--primary-font-color);
  @media (min-width: 700px) {
    max-width: 400px;
    max-height: 800px;
    max-width: 400px;
    max-height: 40%;
    left: calc(50% - 200px);
    top: 30%;
  }
`

const MessageText = styled.p`
  width: 80%;
  font-size: 1.2rem;
  line-height: 1.6rem;
  word-wrap: break-word;
`
