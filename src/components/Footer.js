import React from 'react'
import styled from 'styled-components/macro'
import UserStatus from './UserStatus/UserStatus'
import { AuthConsumer } from './Auth/AuthContext'
import { Router } from 'react-router-dom'
import history from '../common/history'

export default function Footer() {
  return (
    <Router history={history}>
      <AuthConsumer>
        {({ user, logOut }) => (
          <>
            {user.id && (
              <FooterStyled>
                <UserStatus user={user} logOut={logOut} />
              </FooterStyled>
            )}
          </>
        )}
      </AuthConsumer>
    </Router>
  )
}

const FooterStyled = styled.footer`
  height: 60px;
  padding: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--secondary-bg-color);
  color: #fff;
  p {
    text-align: center;
  }
`
