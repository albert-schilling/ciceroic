import React from 'react'
import styled from 'styled-components/macro'
import IconProfile from '../Icons/IconProfile'
import IconRecord from '../Icons/IconRecord'

export default function Navigation({
  user = {},
  modal = '',
  setModal = () => {},
}) {
  return (
    <>
      {user.status === 'signedIn' && (
        <NavigationStyled role="navigation" aria-label="Main">
          <>
            <IconRecord
              callback={() => {
                modal === 'upload' ? setModal('') : setModal('upload')
              }}
            />
            <IconProfile
              callback={() => {
                modal === 'settings' ? setModal('') : setModal('settings')
              }}
            />
          </>
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
