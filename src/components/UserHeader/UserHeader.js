import React from 'react'
import { AuthConsumer, AuthContext } from '../Auth/AuthContext'
import { NavLink, Router } from 'react-router-dom'
import history from '../../common/history'

export default function UserHeader({ user, logOut }) {
  console.log('UserHeader.js: AuthConsumer.user:', AuthConsumer.user)
  console.log('UserHeader.js: AuthConsumer.logOut:', AuthConsumer.logOut)
  console.log('UserHeader.js: AuthConsumer:', AuthConsumer)
  console.log('UserHeader.js: user:', { user })
  console.log('UserHeader.js: AuthContext:', AuthContext)
  // // console.log('UserHeader.js: logOut:', logOut)
  // const user = AuthConsumer.user
  // const logOut = AuthConsumer.logOut
  return (
    <>
      <Router history={history}>
        <AuthConsumer>
          {({ user, logOut }) => (
            <React.Fragment>
              {console.log('userHeader inside consumer:', user)}
              {console.log(
                'userHeader inside consumer, user.user.id:',
                user.id
              )}

              {user && user.id ? (
                <React.Fragment>
                  <small>user: {user.email}</small>
                  <button onClick={e => logOut(e)}>Log out</button>
                </React.Fragment>
              ) : (
                <>
                  <small>Please sign in</small>
                  <NavLink to={'/signup/'}>Sign up</NavLink>
                </>
              )}
            </React.Fragment>
          )}
        </AuthConsumer>
      </Router>
    </>
  )
}
