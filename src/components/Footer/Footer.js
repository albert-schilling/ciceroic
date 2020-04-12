import React from 'react'
import styled from 'styled-components/macro'
import ProfileButton from '../Inputs/Icons/ProfileButton'
import RecordIcon from '../Inputs/Icons/RecordIcon'
import IconProfile from '../Inputs/Icons/IconProfile'
import Imprint from '../Content/Imprint'
import PopUp from '../Interfaces/PopUp/PopUp'

export default function Footer({
  user = {},
  activePage = '',
  setActivePage = () => {},
}) {
  return (
    <>
      {user._id && (
        <nav role="navigation" aria-label="Main">
          {activePage === '' && (
            <RecordIcon callback={() => setActivePage('/upload')} />
          )}
          {activePage === '' && (
            <IconProfile callback={() => setActivePage('/settings')} />
          )}
        </nav>
      )}
      <FooterStyled>
        <PopUp size={'medium'}>
          {'Imprint'}
          <Imprint />
        </PopUp>
      </FooterStyled>
    </>
  )
}

const FooterStyled = styled.footer`
  display: grid;
  justify-content: flex-start;
  padding: 20px;
  background: var(--light-grey);
  font-size: 80%;
`
