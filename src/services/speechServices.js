import * as firebase from './firebase'
import { storage } from './firebase'

export {
  getSpeeches,
  getSpeech,
  getSpeechesByUser,
  uploadSpeech,
  postSpeech,
  patchSpeech,
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
      return doc.data()
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
