import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { firebaseAuth } from '../../services/firebase'
const AuthContext = React.createContext()

function AuthProvider(props) {
  const [user, setUser] = useState({})

  useEffect(() => {
    firebaseAuth.onAuthStateChanged(user => {
      if (user) {
        setUser({
          id: user.uid,
          email: user.email,
        })
        window.localStorage.setItem('uid', user.uid)
      } else {
        setUser({})
        window.localStorage.removeItem('uid')
      }
    })
  }, [])

  async function signUp(email, password, event) {
    try {
      event.preventDefault()
      await firebaseAuth.createUserWithEmailAndPassword(email, password)
      props.history.push('/')
    } catch (err) {}
  }

  async function logIn(email, password, event) {
    try {
      event.preventDefault()
      await firebaseAuth.signInWithEmailAndPassword(email, password)
      props.history.push('/')
    } catch (err) {}
  }

  async function logOut(event) {
    try {
      event.preventDefault()
      firebaseAuth.signOut()
      setUser({})
      props.history.push('/signup')
    } catch (err) {}
  }
  return (
    <AuthContext.Provider
      value={{
        user,
        signUp,
        logIn,
        logOut,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}

const AuthConsumer = AuthContext.Consumer

export default withRouter(AuthProvider)

export { AuthConsumer }
