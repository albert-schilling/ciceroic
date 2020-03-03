import React from 'react'
import styled from 'styled-components/macro'

export default function Footer() {
  return (
    <FooterStyled>
      <p>Become a great speaker like Cicero.</p>
    </FooterStyled>
  )
}

const FooterStyled = styled.footer`
  background: var(--secondary-bg-color);
  color: #fff;
  p {
    text-align: center;
  }
`
