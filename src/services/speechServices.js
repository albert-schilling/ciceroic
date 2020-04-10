import * as firebase from './firebase'
import { storage } from './firebase'

export {
  getSpeeches,
  getSpeech,
  getSpeechesByUser,
  uploadSpeech,
  postSpeech,
  patchSpeech,
  deleteSpeech,
  deleteAllSpeeches,
}

function getSpeeches({ db = firebase.db } = {}) {
  return db
    .collection('speeches')
    .get()
    .then(snapshot => snapshot.docs.map(x => x.data()))
    .catch(error => console.error(error))
}

function getSpeech({ db = firebase.db, id }) {
  return db
    .collection('speeches')
    .doc(id)
    .get()
    .then(doc => {
      if (doc.exists) {
        return doc.data()
      } else {
        return new Error('Speech not found.')
      }
    })
    .catch(error => console.error(error))
}

function getSpeechesByUser({ db = firebase.db, id }) {
  return db
    .collection('speeches')
    .where('userId', '==', id)
    .get()
    .then(snapshot => snapshot.docs.map(doc => doc.data()))
    .catch(error => console.error(error))
}

function patchSpeech({ db = firebase.db, id, speech }) {
  db.collection('speeches')
    .doc(id)
    .update(speech)
    .then(() => {
      return db
        .collection('speeches')
        .doc(id)
        .get()
    })
    .then(doc => {
      if (doc.exists) {
        // console.log('Speech succesfully patched. Speech:', doc.data())
        return doc.data()
      }
    })
}
function postSpeech({ db = firebase.db, speech }) {
  return db
    .collection('speeches')
    .add(speech)
    .then(doc => {
      // console.log('Doc. written with id:', doc.id)
      db.collection('speeches')
        .doc(doc.id)
        .update({ _id: doc.id, uploadStatus: 'uploading' })
        .then(res => {
          // console.log('Speech id successfully written. Speech:', res)
        })
        .catch(error => console.error('Error updating document: ', error))
      return doc.id
    })
    .catch(function(error) {
      console.error('Error writing document: ', error)
    })
}

function uploadSpeech({ file, filename }) {
  // console.log('uploadSpeech called. File:', file, 'filename:', filename)
  const speechReference = storage.ref('speeches/' + filename)
  return speechReference.put(file)
}

function deleteSpeech({ db = firebase.db, id, profile }) {
  if (
    !profile.firstName.includes('testUser') ||
    profile.lastName.includes('testUser')
  )
    return new Error('Sorry, only the test user is allowed to delete a speech.')
  try {
    return db
      .collection('speeches')
      .doc(id)
      .delete()
      .then(() => {
        return `Speech with id ${id} successfully deleted.`
      })
      .catch(error => {
        console.error('Error removing document: ', error)
      })
  } catch (error) {
    return error
  }
}

function deleteAllSpeeches({ db = firebase.db } = {}) {
  return db
    .collection('speeches')
    .get()
    .then(snapshot => snapshot.docs.map(x => x.data()))
    .then(speeches => {
      return speeches.map(speech => {
        return db
          .collection('speeches')
          .doc(speech._id)
          .delete()
          .then(() => {
            // console.log(`Speech with id ${speech._id} successfully deleted.`)
            return `Speech with id ${speech._id} successfully deleted.`
          })
          .catch(error => {
            console.error('Error removing document: ', error)
          })
      })
    })
    .then(() => 'All speeches successfully deleted.')
    .catch(error => console.error(error))
}
