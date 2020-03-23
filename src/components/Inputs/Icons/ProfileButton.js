import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components/macro'
import { useLocation } from 'react-router-dom'
import { useHistory } from 'react-router-dom'

import IconClose from './IconClose'
import IconProfile from './IconProfile'

export default function ProfileButton({ id }) {
  const location = useLocation()
  const history = useHistory()
  return (
    <ProfileButtonContainer>
      {location.pathname.includes('/profile') ||
      location.pathname.includes('/settings') ? (
        <IconClose callback={() => history.goBack()} />
      ) : (
        <NavLink to={`/settings/${id}`}>
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
