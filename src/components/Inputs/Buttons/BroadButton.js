import React from 'react'
import styled from 'styled-components/macro'

export default function BroadButton({
  callback = () => {},
  dataCy = 'broadButton',
  text = 'Broad Button',
  name = 'Broad Button',
  autoFocus = false,
  type = 'button',
  color = 'primary',
  styling = '',
  disabled = false,
}) {
  return (
    <ButtonStyled
      data-cy={dataCy}
      className={`${color} + ${styling} `}
      name={name}
      autoFocus={autoFocus}
      onClick={callback}
      type={type}
      disabled={disabled}
    >
      {text}
    </ButtonStyled>
  )
}

const ButtonStyled = styled.button`
  margin: 12px 0;
  width: 100%;
  border: none;
  padding: 8px;
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
`
