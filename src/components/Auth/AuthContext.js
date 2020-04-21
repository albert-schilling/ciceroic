import React, { useEffect, useState } from 'react'
import { withRouter, useHistory } from 'react-router-dom'
import { authentication } from '../../services/firebase'
import { db } from '../../services/firebase'
import { initialProfile } from '../../data/initialProfile'

const AuthContext = React.createContext()
function AuthProvider({ children, setProfile }) {
  const [user, setUser] = useState({ status: 'unclear' })
  const history = useHistory()

  useEffect(() => {
    authentication.onAuthStateChanged(user => {
      if (user) {
        setUser({
          _id: user.uid,
          email: user.email,
          status: 'signedIn',
        })
        window.localStorage.setItem('uid', user.uid)
        getUserInformation()
      } else {
        setUser({ status: 'signedOut' })
        setProfile(initialProfile)
        window.localStorage.removeItem('uid')
      }
    })
  }, [])

  async function getUserInformation() {
    // console.log('Getting user information ...')
    await db
      .collection('users')
      .doc(authentication.currentUser.uid)
      .get()
      .then(doc => {
        // console.log('User found in DB:', doc.exists)
        return doc.exists && doc.data()
      })
      .then(async data => {
        await setProfile({ ...data })
      })
      .catch(error => {
        console.error('Error writing document: ', error)
      })
  }

  async function logOut(event) {
    console.log('logout called')
    try {
      event.preventDefault()
      authentication.signOut()
      setUser({})
      setProfile(initialProfile)
      // console.log('User logged out. Profile resetted.')
      history.push('/')
    } catch (err) {}
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

const AuthConsumer = AuthContext.Consumer

export default withRouter(AuthProvider)

export { AuthConsumer }
