import { db, authentication, storage } from './firebase'

function getUser(id) {
  // console.log('Getting user information ...')
  return db
    .collection('users')
    .doc(id)
    .get()
    .then(doc => {
      // console.log('User found in DB:', doc.exists)
      return doc.exists && doc.data()
    })
    .then(data => {
      return data
    })
    .catch(error => {
      console.error('Error writing document: ', error)
    })
}

async function signUp({ email, password, firstName, lastName }) {
  return await authentication
    .createUserWithEmailAndPassword(email, password)
    .then(async res => {
      await addUserToDB({ db, user: res.user, firstName, lastName })
      await updateUsersDisplayName({ firstName, lastName })
      await authentication.currentUser.sendEmailVerification()
      return res
    })
    .catch(error => {
      console.error('Error creating new user: ', error)
      return error
    })
}

async function addUserToDB({ db, user, firstName, lastName }) {
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
    .then(() => {
      // console.log('User successfully stored in DB!')
    })
    .catch(error => {
      console.error('Error writing document: ', error)
    })
}

async function updateUsersDisplayName({ firstName, lastName }) {
  return await authentication.currentUser
    .updateProfile({
      displayName: `${firstName} ${lastName}`,
    })
    .then(() => {
      // console.log("User's display name successfully updated.")
    })
    .catch(error => {
      console.error(`Error updating user's display name:`, error)
    })
}

async function logIn({ email, password }) {
  return await authentication
    .signInWithEmailAndPassword(email, password)
    .then(res => res)
    .catch(error => error)
}

function updateUser(profile) {
  db.collection('users')
    .doc(profile._id)
    .set({
      ...profile,
    })
    .then(function() {
      // console.log('User successfully updated!')
    })
    .catch(function(error) {
      console.error('Error writing document: ', error)
    })
}
function updateAbout(profile) {
  db.collection('users')
    .doc(profile._id)
    .update({
      about: profile.about,
    })
    .then(function() {
      // console.log('User successfully updated!')
    })
    .catch(function(error) {
      console.error('Error writing document: ', error)
    })
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
          setProfile({ ...profile, portrait: url })
          updatePortrait(profile, url)
        })
        .catch(error => {
          setMessage({
            ...message,
            visible: true,
            text: `Sorry, there was an error uploading the file.`,
          })
          console.log('Error uploading file:', error)
        })
      console.log('Uploaded file succesfully.')
    })
    .catch(error => {
      setMessage({
        ...message,
        visible: true,
        text: `Sorry, there was an error uploading the file.`,
      })
      console.log('Error uploading file:', error)
    })
}

function updatePortrait(profile, reference) {
  db.collection('users')
    .doc(profile._id)
    .update({
      portrait: reference,
    })
    .then(function() {
      console.log('User portrait successfully updated!')
    })
    .catch(function(error) {
      console.error('Error writing document: ', error)
    })
}

function deletePortrait(profile) {
  const portraitReference = storage.refFromURL(profile.portrait)
  return portraitReference
    .delete()
    .then(snapshot => {
      console.log('File succesfully deleted.')
      updatePortrait(profile, '')
    })
    .catch(error => console.log('Error uploading file:', error))
}

export {
  signUp,
  addUserToDB,
  updateUser,
  updateAbout,
  uploadPortrait,
  deletePortrait,
  getUser,
  logIn,
}
