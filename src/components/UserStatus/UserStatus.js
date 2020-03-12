import React from 'react'
import { NavLink, Router } from 'react-router-dom'
import history from '../../common/history'
import { AuthConsumer } from '../Auth/AuthContext'

export default function UserHeader() {
  return (
    <>
      <Router history={history}>
        <AuthConsumer>
          {({ user, logOut }) => (
            <>
              {user.id ? (
                <>
                  <small>user: {user.email}</small>
                  <button onClick={e => logOut(e)}>Log out</button>
                </>
              ) : (
                <>
                  <small>Please sign in</small>
                  <NavLink to={'/signup/'}>Sign up</NavLink>
                </>
              )}
            </>
          )}
        </AuthConsumer>
      </Router>
    </>
  )
}
