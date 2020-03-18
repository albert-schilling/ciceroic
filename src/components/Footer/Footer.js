import React from 'react'
import { AuthConsumer } from '../Auth/AuthContext'
import { Router } from 'react-router-dom'
import history from '../../common/history'
import ProfileMenu from './ProfileMenu'
import RecordIcon from './RecordIcon'

export default function Footer() {
  return (
    <Router history={history}>
      <AuthConsumer>
        {({ user, logOut }) => (
          <>
            {user.id && (
              <footer role="navigation" aria-label="Main">
                <ProfileMenu logOut={logOut} />
                <RecordIcon />
              </footer>
            )}
          </>
        )}
      </AuthConsumer>
    </Router>
  )
}
