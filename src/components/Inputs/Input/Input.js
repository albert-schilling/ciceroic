import React from 'react'
import styled from 'styled-components/macro'

export default function Input({
  dataCy = 'broadInput',
  callback = () => {},
  text = 'Broad Input',
  name = 'Broad Input',
  autoFocus = false,
  type = 'text',
  color = 'primary',
  styling = '',
  disabled = false,
}) {
  return (
    <>
      <Label
        data-cy={dataCy}
        className={`${color} + ${styling}`}
        name={name}
        autoFocus={autoFocus}
        type={type}
        htmlFor={name}
      >
        {text}
      </Label>
      <InputStyled
        type="file"
        id={name}
        name={name}
        onChange={callback}
        disabled={disabled}
      />
    </>
  )
}

const Label = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 12px 0;
  width: 100%;
  border: none;
  padding: 8px;
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
const InputStyled = styled.input`
  display: none;
  width: 0;
  height: 0;
`
