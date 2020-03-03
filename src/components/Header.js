import React from 'react'
import styled from 'styled-components/macro'

export default function Header() {
  return (
    <HeaderStyled>
      <h1>Ciceroic</h1>
    </HeaderStyled>
  )
}

const HeaderStyled = styled.header`
  background: var(--primary-bg-color);
  color: var(--inverse-primary-font-color);
  padding: 20px;
  height: 100%;
  h1 {
    font-size: 1.6rem;
    text-align: center;
    margin: 8px;
  }
`
