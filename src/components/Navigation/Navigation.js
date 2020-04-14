import React from 'react'
import styled from 'styled-components/macro'
import IconProfile from '../Inputs/Icons/IconProfile'
import RecordIcon from '../Inputs/Icons/RecordIcon'

export default function Navigation({
  user = {},
  activePage = '',
  setActivePage = () => {},
}) {
  return (
    <>
      {user._id && (
        <NavigationStyled role="navigation" aria-label="Main">
          {activePage === '' && (
            <>
              <RecordIcon callback={() => setActivePage('/upload')} />
              <IconProfile callback={() => setActivePage('/settings')} />
            </>
          )}
        </NavigationStyled>
      )}
    </>
  )
}

const NavigationStyled = styled.nav`
  position: fixed;
  bottom: 0;
  justify-self: center;
  width: 100%;
  max-width: 1200px;
  @media (min-width: 1200px) {
    left: calc(50% - 600px);
  }
`
