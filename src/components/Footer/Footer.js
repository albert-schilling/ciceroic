import React from 'react'
import styled from 'styled-components/macro'
import Imprint from '../Content/Imprint'
import PopUp from '../Interfaces/PopUp/PopUp'

export default function Footer({}) {
  return (
    <FooterStyled>
      <Line />
      <PopUp size={'medium'}>
        {'Imprint'}
        <Imprint />
      </PopUp>
    </FooterStyled>
  )
}

const FooterStyled = styled.footer`
  display: grid;
  justify-content: flex-start;
  justify-self: center;
  width: 100%;
  max-width: 1200px;
  padding: 40px 24px 200px;
  background: var(--light-grey);
  font-size: 80%;
`

const Line = styled.hr`
  color: var(--primary-font-color);
  width: 100%;
  margin: 20px;
`
