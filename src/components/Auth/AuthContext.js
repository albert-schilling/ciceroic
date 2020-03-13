import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { firebaseAuth } from '../../services/firebase'
import { db } from '../../services/firebase'

const AuthContext = React.createContext()

function AuthProvider({ history, children, userData, setUserData }) {
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

  async function signUp(event) {
    console.log('Signup called')
    console.log(userData.email)
    console.log(userData.password)
    console.log(userData)
    try {
      event.preventDefault()
      await firebaseAuth
        .createUserWithEmailAndPassword(userData.email, userData.password)
        .then(res => {
          addUserToDB(res.user)
        })
      history.push('/')
    } catch (err) {}
  }

  async function addUserToDB(user) {
    db.collection('users')
      .doc(user.uid)
      .set({
        _id: user.uid,
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: user.email,
        registered: new Date().getTime(),
      })
      .then(function() {
        console.log('Document successfully written!')
      })
      .catch(function(error) {
        console.error('Error writing document: ', error)
      })

    // db
    //         .collection('users')
    //         .add({
    //           _id: user.uid,
    //           firstName: userData.firstName,
    //           lastName: userData.lastName,
    //           registered: new Date().getTime(),
    //         })
    //         .then(docRef => {
    //           console.log('Document written with ID: ', docRef.id)
    //           console.log(
    //             'Document written with unique ID from Auth: ',
    //             docRef.uid
    //           )
    //           console.log('New user: ', docRef)
    //         })
  }

  async function logIn(event) {
    try {
      event.preventDefault()
      await firebaseAuth.signInWithEmailAndPassword(
        userData.email,
        userData.password
      )
      history.push('/')
    } catch (err) {}
  }

  async function logOut(event) {
    try {
      event.preventDefault()
      firebaseAuth.signOut()
      setUser({})
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
