import * as firebase from './firebase'
import { authentication, storage } from './firebase'

function getUser({ db = firebase.db, id }) {
  try {
    return db
      .collection('users')
      .doc(id)
      .get()
      .then(doc => {
        // console.log('User found in DB:', doc.exists)
        if (!doc.exists) return new Error('User not found in db!')
        return doc.data()
      })
      .catch(error => {
        console.error('Error getting user: ', error)
        return error
      })
  } catch (error) {
    console.error('Error getting user: ', error)
    return error
  }
}

async function signUp({
  db = firebase.db,
  email,
  password,
  firstName,
  lastName,
  terms = false,
  newsletter = false,
}) {
  return await authentication
    .createUserWithEmailAndPassword(email, password)
    .then(async res => {
      await addUser({
        db,
        user: res.user,
        firstName,
        lastName,
        terms,
        newsletter,
      })
      await updateUsersDisplayName({ firstName, lastName })
      await authentication.currentUser.sendEmailVerification()
      return res
    })
    .catch(error => {
      console.error('Error creating new user: ', error)
      return error
    })
}

async function addUser({
  db = firebase.db,
  user,
  firstName,
  lastName,
  terms = false,
  newsletter = false,
}) {
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
      terms,
      newsletter,
    })
    .then(() => {
      // console.log('User successfully stored in DB.')
    })
    .catch(error => console.error('Error writing document: ', error))
}

async function updateUsersDisplayName({ firstName, lastName }) {
  return await authentication.currentUser
    .updateProfile({
      displayName: `${firstName} ${lastName}`,
    })
    .then(() => {
      // console.log("User's display name successfully updated.")
    })
    .catch(error => console.error(`Error updating user's display name:`, error))
}

async function logIn({ email, password }) {
  return await authentication
    .signInWithEmailAndPassword(email, password)
    .then(res => res)
    .catch(error => error)
}

function updateUser({ db = firebase.db, profile }) {
  console.log('profile in updateUser', profile)
  return db
    .collection('users')
    .doc(profile._id)
    .set(
      {
        ...profile,
      },
      { merge: true }
    )
    .then(() => {
      // console.log('User successfully updated!')
    })
    .catch(error => console.error('Error writing document: ', error))
}

function uploadPortrait({
  file,
  filename,
  profile,
  setMessage,
  message,
  setProfile,
}) {
  const portraitReference = storage.ref('images/portraits/' + filename)
  portraitReference
    .put(file)
    .then(snapshot => {
      portraitReference
        .getDownloadURL()
        .then(url => {
          updateUser({ profile: { ...profile, portrait: url } })
          setProfile({ ...profile, portrait: url })
        })
        .catch(error => {
          setMessage({
            ...message,
            visible: true,
            text: `Sorry, there was an error uploading the file.`,
          })
          console.error('Error uploading file:', error)
        })
      // console.log('Uploaded file succesfully.')
    })
    .catch(error => {
      setMessage({
        ...message,
        visible: true,
        text: `Sorry, there was an error uploading the file.`,
      })
      console.error('Error uploading file:', error)
    })
}

function deletePortrait({ profile }) {
  const portraitReference = storage.refFromURL(profile.portrait)
  return portraitReference
    .delete()
    .then(snapshot => {
      // console.log('File succesfully deleted.')
      updateUser({ profile: { ...profile, portrait: '' } })
    })
    .catch(error => console.error('Error uploading file:', error))
}

function deleteAllUsers({ db = firebase.db } = {}) {
  return db
    .collection('users')
    .get()
    .then(snapshot => snapshot.docs.map(x => x.data()))
    .then(users => {
      return users.map(user => {
        return db
          .collection('users')
          .doc(user._id)
          .delete()
          .then(() => {
            // console.log(`User with id ${user._id} successfully deleted.`)
            return `User with id ${user._id} successfully deleted.`
          })
          .catch(error => {
            console.error('Error removing document: ', error)
          })
      })
    })
    .then(() => 'All Users successfully deleted.')
    .catch(error => console.error(error))
}

async function deleteUser({ db = firebase.db, id }) {
  try {
    return (
      (await deleteUserFromAuthentication()) &&
      (await deleteUserFromDB({ id })) &&
      'User successfully deleted.'
    )
  } catch (error) {
    console.error('Error deleting user:', error)
    return error
  }
}

function deleteUserFromAuthentication({} = {}) {
  const user = authentication.currentUser
  return user
    .delete()
    .then(() => true)
    .catch(error => {
      console.error('Error removing user: ', error)
    })
}
function deleteUserFromDB({ db = firebase.db, id }) {
  return db
    .collection('users')
    .doc(id)
    .delete()
    .then(() => {
      // console.log(`User with id ${user._id} successfully deleted.`)
      return true
    })
    .catch(error => {
      console.error('Error removing document: ', error)
    })
}

export {
  signUp,
  logIn,
  addUser,
  getUser,
  updateUser,
  uploadPortrait,
  deletePortrait,
  deleteUser,
  deleteAllUsers,
  deleteUserFromAuthentication,
  deleteUserFromDB,
}
