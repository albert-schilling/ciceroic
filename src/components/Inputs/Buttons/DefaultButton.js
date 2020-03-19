import React from 'react'
import styled from 'styled-components/macro'

export default function Button({
  callback = () => {},
  text = 'Default Button',
  name = 'Default Button',
  autoFocus = false,
  type = 'button',
  color = 'primary',
}) {
  return (
    <ButtonStyled
      className={color}
      name={name}
      autoFocus={autoFocus}
      onClick={callback}
      type={type}
    >
      {text}
    </ButtonStyled>
  )
}

const ButtonStyled = styled.button`
  margin: 12px 0;
  width: max-content;
  border: none;
  padding: 8px;
  text-align: center;
  font-size: 1rem;
  color: var(--inverse-primary-font-color);
  text-decoration: none;
  cursor: pointer;
  &.primary {
    background: var(--highlight-color);
  }
  &.secondary {
    background: var(--secondary-highlight-color);
  }
  &.tertiary {
    background: var(--light-grey);
    color: var(--primary-font-color);
  }
`
