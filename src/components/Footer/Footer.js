import React from 'react'
import styled from 'styled-components/macro'
import Imprint from '../Content/Imprint'
import Modal from '../Interfaces/Modal/Modal'

const FooterStyled = styled.footer`
  display: grid;
  justify-content: flex-start;
  justify-self: center;
  width: 100%;
  max-width: 1200px;
  height: max-content;
  padding: 40px 24px 200px;
  background: var(--light-grey);
  font-size: 80%;
`

const Line = styled.hr`
  color: var(--primary-font-color);
  width: 100%;
  height: max-content;
  margin: 20px;
`

export default function Footer() {
  return (
    <FooterStyled>
      <Line />
      <Modal size={'medium'}>
        {'Imprint'}
        <Imprint />
      </Modal>
    </FooterStyled>
  )
}
