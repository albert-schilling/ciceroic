import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { authentication } from '../../services/firebase'
import { db } from '../../services/firebase'
import { emptyProfile } from '../../data/emptyProfile'

const AuthContext = React.createContext()

function AuthProvider({ history, children, profile, setProfile }) {
  const [user, setUser] = useState({})

  useEffect(() => {
    authentication.onAuthStateChanged(user => {
      if (user) {
        setUser({
          _id: user.uid,
          email: user.email,
        })
        window.localStorage.setItem('uid', user.uid)
        getUserInformation()
      } else {
        setUser({})
        setProfile(emptyProfile)
        window.localStorage.removeItem('uid')
      }
    })
  }, [])

  async function getUserInformation() {
    // console.log('Getting user information ...')
    const user = await authentication.currentUser
    await db
      .collection('users')
      .doc(user.uid)
      .get()
      .then(doc => {
        // console.log('User found in DB:', doc.exists)
        return doc.exists && doc.data()
      })
      .then(data => {
        Object.assign(profile, { ...data })
      })
      .catch(error => {
        console.error('Error writing document: ', error)
      })
    setProfile(profile)
    // console.log('Updating profile:', profile)
  }
  // async function signUp(event) {
  //   // console.log('Signup called')
  //   try {
  //     event.preventDefault()
  //     await authentication
  //       .createUserWithEmailAndPassword(profile.email, profile.password)
  //       .then(res => {
  //         addUserToDB(res.user)
  //       })
  //       .catch(function(error) {
  //         console.error('Error creating new user: ', error)
  //       })
  //     history.push('/')
  //   } catch (err) {}
  // }

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
    const user = await authentication.currentUser

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
    const user = await authentication.currentUser
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
      await authentication.signInWithEmailAndPassword(
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
      authentication.signOut()
      setUser({})
      setProfile(emptyProfile)
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

async function signUp({ email, password, firstName, lastName }) {
  console.log('Signup called')
  console.log('email', email)
  return await authentication
    .createUserWithEmailAndPassword(email, password)
    .then(res => {
      addUserToDB(res.user, firstName, lastName)
      return res
    })
    .catch(function(error) {
      console.error('Error creating new user: ', error)
      return error
    })
}

async function addUserToDB(user, firstName, lastName) {
  return await db
    .collection('users')
    .doc(user.uid)
    .set({
      _id: user.uid,
      firstName: firstName,
      lastName: lastName,
      email: user.email,
      registered: new Date().getTime(),
      emailVerified: user.emailVerified,
    })
    .then(function() {
      console.log('User successfully stored in DB!')
    })
    .then(() => updateUsersDisplayName(firstName, lastName))
    .catch(function(error) {
      console.error('Error writing document: ', error)
    })
}

async function updateUsersDisplayName(firstName, lastName) {
  return await authentication.currentUser
    .updateProfile({
      displayName: `${firstName} ${lastName}`,
    })
    .then(() => {
      console.log("User's display name successfully updated.")
    })
    .then(() => {
      authentication.currentUser.sendEmailVerification()
    })
    .catch(error => {
      console.error(`Error updating user's display name:`, error)
    })
}

export { AuthConsumer, signUp }
