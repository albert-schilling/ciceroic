import React from 'react'
import styled from 'styled-components/macro'

export default function PageLayout({ title, children }) {
  return (
    <PageStyled>
      <Header>{title}</Header>
      {children}
    </PageStyled>
  )
}

const PageStyled = styled.main`
  display: grid;
  grid-template-rows: 48px auto;
  align-content: flex-start;
  overflow: auto;
`
const Header = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #444;
  color: white;
`
