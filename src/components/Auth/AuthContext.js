import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { firebaseAuth } from '../../services/firebase'
import { db } from '../../services/firebase'

const AuthContext = React.createContext()

function AuthProvider({
  history,
  children,
  profile,
  setProfile,
  profileRetrieved,
  setProfileRetrieved,
}) {
  const [user, setUser] = useState({})

  useEffect(() => {
    firebaseAuth.onAuthStateChanged(user => {
      if (user) {
        setUser({
          id: user.uid,
          email: user.email,
        })
        window.localStorage.setItem('uid', user.uid)
        getUserInformation()
      } else {
        setUser({})
        setProfile({
          email: '',
          password: '',
          firstName: '',
          lastName: '',
          id: '',
        })
        window.localStorage.removeItem('uid')
      }
    })
  }, [])

  async function getUserInformation() {
    // console.log('Getting user information ...')
    const user = await firebaseAuth.currentUser
    await db
      .collection('users')
      .doc(user.uid)
      .get()
      .then(doc => {
        // console.log('User found in DB:', doc.exists)
        return doc.exists && doc.data()
      })
      .then(data => {
        Object.assign(profile, {
          firstName: data.firstName,
          lastName: data.lastName,
          id: data._id,
        })
      })
      .catch(error => {
        console.error('Error writing document: ', error)
      })
    setProfile(profile)
    setProfileRetrieved(true)
    // console.log('Updating profile:', profile)
  }
  async function signUp(event) {
    // console.log('Signup called')
    try {
      event.preventDefault()
      await firebaseAuth
        .createUserWithEmailAndPassword(profile.email, profile.password)
        .then(res => {
          addUserToDB(res.user)
        })
        .catch(function(error) {
          console.error('Error creating new user: ', error)
        })
      history.push('/')
    } catch (err) {}
  }

  async function addUserToDB(user) {
    db.collection('users')
      .doc(user.uid)
      .set({
        _id: user.uid,
        firstName: profile.firstName,
        lastName: profile.lastName,
        email: user.email,
        registered: new Date().getTime(),
        emailVerified: user.emailVerified,
      })
      .then(function() {
        // console.log('User successfully stored in DB!')
      })
      .then(() => updateUsersDisplayName())
      .catch(function(error) {
        console.error('Error writing document: ', error)
      })
  }

  async function updateUsersDisplayName() {
    const user = await firebaseAuth.currentUser

    user
      .updateProfile({
        displayName: `${profile.firstName} ${profile.lastName}`,
      })
      .then(() => {
        // console.log("User's display name successfully updated.")
      })
      .then(() => {
        sendEmailVerification()
      })
      .catch(error => {
        console.error(`Error updating user's display name:`, error)
      })
  }

  async function sendEmailVerification() {
    const user = await firebaseAuth.currentUser
    user
      .sendEmailVerification()
      .then(() => {
        // console.log('Verification email sent to user.')
      })
      .catch(error => {
        console.error(`Error sending verification email to user.`, error)
      })
  }

  async function logIn(event) {
    try {
      event.preventDefault()
      await firebaseAuth.signInWithEmailAndPassword(
        profile.email,
        profile.password
      )
      history.push('/')
    } catch (error) {
      console.error(`Error logging in user.`, error)
    }
  }

  async function logOut(event) {
    try {
      event.preventDefault()
      firebaseAuth.signOut()
      setUser({})
      setProfile({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        id: '',
      })
      // console.log('User logged out. Profile resetted.')
      history.push('/')
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
      {children}
    </AuthContext.Provider>
  )
}

const AuthConsumer = AuthContext.Consumer

export default withRouter(AuthProvider)

export { AuthConsumer }
