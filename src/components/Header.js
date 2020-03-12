import React from 'react'
import styled from 'styled-components/macro'
import UserStatus from './UserStatus/UserStatus'

export default function Header() {
  return (
    <HeaderStyled>
      <h1>Ciceroic</h1>
      <UserStatus />
    </HeaderStyled>
  )
}

const HeaderStyled = styled.header`
  background: var(--primary-bg-color);
  color: var(--inverse-primary-font-color);
  padding: 20px;
  height: 100%;
  display: flex;
  h1 {
    font-size: 1.6rem;
    text-align: center;
    margin: 8px;
  }
`
