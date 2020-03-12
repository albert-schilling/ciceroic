import React, { useEffect, useState } from 'react'
import { NavLink, Router } from 'react-router-dom'
import history from '../../common/history'
import { AuthConsumer } from '../Auth/AuthContext'
import SpeechesList from '../Speech/SpeechesList'
import UserForm from '../UserForm/UserForm'

export default function HomePage({ speeches, setSpeech, speechBasePath }) {
  const [userSignedIn, setUserSignedIn] = useState(true)
  // useEffect(() => {}, [userSignedIn])
  return (
    <>
      <Router history={history}>
        <AuthConsumer>
          {({ user }) => {
            setTimeout(() => checkUserStatus(user), 3000)

            return userSignedIn === true ? (
              speeches === undefined ? (
                <p style={{ padding: '20px' }}>
                  Sorry, we cannot connect to the server. Please, try again
                  later.
                </p>
              ) : (
                <SpeechesList
                  speeches={speeches}
                  setSpeech={setSpeech}
                  speechBasePath={speechBasePath}
                />
              )
            ) : (
              <UserForm></UserForm>
            )
          }}
        </AuthConsumer>
      </Router>
    </>
  )
  function checkUserStatus(user) {
    console.log(user.id)
    setTimeout(() => {
      user.id ? setUserSignedIn(true) : setUserSignedIn(false)
    }, 3000)
  }
}

{
  /* {({ user }) => (
            <>
              {console.log(user)}
              {user.id ? (
                speeches === undefined ? (
                  <p style={{ padding: '20px' }}>
                    Sorry, we cannot connect to the server. Please, try again
                    later.
                  </p>
                ) : (
                  <SpeechesList
                    speeches={speeches}
                    setSpeech={setSpeech}
                    speechBasePath={speechBasePath}
                  />
                )
              ) : (
                <UserForm></UserForm>
              )}
            </>
          )} */
}
