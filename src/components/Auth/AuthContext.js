import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { firebaseAuth } from '../../services/firebase'
const AuthContext = React.createContext()

function AuthProvider(props) {
  console.log('AuthContext.js: props:', props)
  console.log(
    'AuthContext.js: firebaseAuth:'
    // firebaseAuth.onAuthStateChanged()
  )
  const [user, setUser] = useState({})

  useEffect(() => {
    firebaseAuth.onAuthStateChanged(user => {
      if (user) {
        setUser({
          user: {
            id: user.uid,
            email: user.email,
          },
        })
        window.localStorage.setItem('uid', user.uid)
      } else {
        setUser({
          user: {},
        })
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
      setUser({
        user: {},
      })
      props.history.push('/signup')
    } catch (err) {}
  }
  console.log('AuthContext.js: AuthContext:', AuthContext)

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
// const AuthConsumer = AuthProvider.Consumer

export default withRouter(AuthProvider)

export { AuthConsumer, AuthContext }

// class syntax:

// import React from 'react'
// import { firebaseAuth } from '../../services/firebase'
// import { withRouter } from 'react-router-dom'
// const AuthContext = React.createContext()

// class AuthProvider extends React.Component {
//   console.log('AuthContext.js: this.props:', this.props);

//   state = {
//     user: {},
//   }
//   componentDidMount() {

//     firebaseAuth.onAuthStateChanged(user => {
//       if (user) {
//         this.setState({
//           user: {
//             id: user.uid,
//             email: user.email,
//           },
//         })
//         window.localStorage.setItem('uid', user.uid)
//       } else {
//         this.setState({
//           user: {},
//         })
//         window.localStorage.removeItem('uid')
//       }
//     })
//   }

//   signUp = async (email, password, e) => {
//     try {
//       e.preventDefault()
//       await firebaseAuth.createUserWithEmailAndPassword(email, password)
//       this.props.history.push('/')
//     } catch (err) {}
//   }

//   logIn = async (email, password, e) => {
//     try {
//       e.preventDefault()
//       await firebaseAuth.signInWithEmailAndPassword(email, password)
//       this.props.history.push('/')
//     } catch (err) {}
//   }

//   logOut = e => {
//     try {
//       e.preventDefault()
//       firebaseAuth.signOut()
//       this.setState({
//         user: {},
//       })
//       this.props.history.push('/signup')
//     } catch (err) {}
//   }

//   render() {
//     return (
//       <AuthContext.Provider
//         value={{
//           user: this.state.user,
//           signUp: this.signUp,
//           logIn: this.logIn,
//           logOut: this.logOut,
//         }}
//       >
//         {this.props.children}
//       </AuthContext.Provider>
//     )
//   }
// }

// const AuthConsumer = AuthContext.Consumer
// // const AuthConsumer = AuthProvider.Consumer

// export default withRouter(AuthProvider)

// export { AuthConsumer, AuthProvider }
