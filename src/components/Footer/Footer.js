import React from 'react'
import { AuthConsumer } from '../Auth/AuthContext'
import { Router } from 'react-router-dom'
import history from '../../common/history'
import ProfileButton from '../Inputs/Icons/ProfileButton'
import RecordIcon from '../Inputs/Icons/RecordIcon'
import { useLocation } from 'react-router-dom'

export default function Footer() {
  const location = useLocation()

  return (
    <Router history={history}>
      <AuthConsumer>
        {({ user }) => (
          <>
            {user._id && (
              <footer role="navigation" aria-label="Main">
                <ProfileButton />
                {location.pathname !== '/profile' && <RecordIcon />}
              </footer>
            )}
          </>
        )}
      </AuthConsumer>
    </Router>
  )
}
