import React from 'react'
import styled from 'styled-components/macro'

export default function BroadInput({
  callback = () => {},
  text = 'Broad Input',
  name = 'Broad Input',
  autoFocus = false,
  type = 'text',
  color = 'primary',
  styling = '',
}) {
  return (
    <InputStyled
      className={`${color} + ${styling}`}
      name={name}
      autoFocus={autoFocus}
      // onClick={callback}
      type={type}
    />
  )
}

const InputStyled = styled.input`
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
`
