import React from 'react'
import styled from 'styled-components/macro'

export default function Button({
  callback = () => {},
  dataCy = 'Button',
  text = 'Default Button',
  name = 'Default Button',
  autoFocus = false,
  styling = 'primary',
  disabled = false,
}) {
  return (
    <ButtonStyled
      data-cy={dataCy}
      className={styling}
      name={name}
      autoFocus={autoFocus}
      onClick={callback}
      disabled={disabled}
    >
      {text}
    </ButtonStyled>
  )
}

const ButtonStyled = styled.button`
  margin: 12px 0;
  width: max-content;
  height: max-content;
  border: none;
  padding: 8px;
  background: var(--highlight-color);
  text-align: center;
  font-size: 1rem;
  color: var(--inverse-primary-font-color);
  text-decoration: none;
  cursor: pointer;
  &.m0 {
    margin: 0;
  }
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
  :disabled {
    cursor: not-allowed;
  }
  &.full-width {
    width: 100%;
  }
`
