import React from 'react'
import styled from 'styled-components/macro'

export default function Button({
  callback = () => {},
  text = 'Default Button',
  name = 'Default Button',
  autoFocus = false,
}) {
  return (
    <ButtonStyled name={name} autoFocus={autoFocus} onClick={callback}>
      {text}
    </ButtonStyled>
  )
}

const ButtonStyled = styled.button`
  margin: 20px 0 12px 0;
  align-self: center;
  width: max-content;
  border: none;
  padding: 8px;
  background: var(--primary-bg-color);
  text-align: center;
  font-size: 1rem;
  color: var(--inverse-primary-font-color);
  text-decoration: none;
  cursor: pointer;
`
