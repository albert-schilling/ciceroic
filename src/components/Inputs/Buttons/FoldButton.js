import React from 'react'
import styled from 'styled-components/macro'

export default function Button({
  callback = () => {},
  name = 'fold',
  autoFocus = false,
}) {
  return (
    <ButtonStyled name={name} autoFocus={autoFocus} onClick={callback}>
      <svg width="9.18" height="16" viewBox="0 0 9.18 16">
        <path
          id="ic_unfold_less_24px"
          d="M7.41,18.59,8.83,20,12,16.83,15.17,20l1.41-1.41L12,14ZM16.59,5.41,15.17,4,12,7.17,8.83,4,7.41,5.41,12,10Z"
          transform="translate(-7.41 -4)"
          fill="#003"
        />
      </svg>
    </ButtonStyled>
  )
}

const ButtonStyled = styled.button`
  margin: 0 0 0 4px;
  border: none;
  width: max-content;
  height: max-content;
  padding: 2px 4px;
  background: var(--light-grey);
  text-align: center;
  font-size: 0.9rem;
  color: var(--highlight-color);
  text-decoration: none;
  cursor: pointer;
`
