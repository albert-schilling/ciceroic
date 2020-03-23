import { db, storage } from './firebase'

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

export { updateUser, updateAbout, uploadPortrait, deletePortrait, getUser }
