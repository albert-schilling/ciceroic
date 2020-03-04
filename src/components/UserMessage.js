import React from 'react'
import styled from 'styled-components/macro'
import { NavLink } from 'react-router-dom'

export default function UserMessage({
  message,
  visibility,
  setVisibility,
  returnPath,
  messageCallback,
}) {
  const MessageBody = styled.article`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: ${visibility};
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: var(--primary-bg-color);
    color: var(--inverse-primary-font-color);
  `
  const MessageButton = styled(NavLink)`
    margin: 16px 0 4px 0;
    align-self: center;
    width: max-content;
    padding: 8px;
    background: var(--secondary-bg-color);
    text-align: center;
    color: var(--inverse-primary-font-color);
    text-decoration: none;
  `
  const MessageText = styled.p`
    width: 80%;
    font-size: 1.2rem;
    line-height: 1.6rem;
    word-wrap: break-word;
  `

  return (
    <MessageBody>
      <MessageText>{message}</MessageText>
      <MessageButton
        onClick={() => {
          setVisibility('none')
          console.log(messageCallback)
        }}
        to={returnPath}
      >
        Return
      </MessageButton>
    </MessageBody>
  )
}
