import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components/macro'
import { useLocation } from 'react-router-dom'
import { useHistory } from 'react-router-dom'

import IconClose from './IconClose'
import IconProfile from './IconProfile'

export default function ProfileButton() {
  const location = useLocation()
  const history = useHistory()
  return (
    <ProfileButtonContainer>
      {location.pathname === '/profile' ? (
        <IconClose callback={() => history.goBack()} />
      ) : (
        <NavLink to="/profile">
          <IconProfile />
        </NavLink>
      )}
    </ProfileButtonContainer>
  )
}

const ProfileButtonContainer = styled.section`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
`
