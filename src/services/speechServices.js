import { db, storage } from './firebase'

export function postSpeeches(speeches) {
  speeches.forEach(speech => {
    db.collection('speeches')
      .add(speech)
      .then(docRef => {
        console.log('Document written with ID: ', docRef.id)
        console.log('New Document: ', docRef)
        const documentId = docRef.id
        db.collection('speeches')
          .doc(docRef.id)
          .update({
            _id: documentId,
          })
        return documentId
      })
      .then(documentId => {
        db.collection('speeches')
          .doc(documentId)
          .get()
          .then(doc => {
            if (doc.exists) {
              console.log(
                'Newly created data coming back from firestore:',
                doc.data()
              )
              return doc.data()
            }
          })
      })
      .catch(error => {
        console.error('Error adding document: ', error)
      })
  })
}

export function getSpeeches() {
  return db
    .collection('speeches')
    .get()
    .then(snapshot => snapshot.docs.map(x => x.data()))
    .catch(error => console.error(error))
}

export function getSpeech(id) {
  return db
    .collection('speeches')
    .doc(id)
    .get()
    .then(doc => {
      return doc.data()
    })
    .catch(error => console.error(error))
}

export function getSpeechesByUser(id) {
  return db
    .collection('speeches')
    .where('userId', '==', id)
    .get()
    .then(snapshot => snapshot.docs.map(doc => doc.data()))
    .catch(error => console.error(error))
}

export function patchSpeech(id, data) {
  db.collection('speeches')
    .doc(id)
    .update(data)
    .then(() => {
      return db
        .collection('speeches')
        .doc(id)
        .get()
    })
    .then(doc => {
      if (doc.exists) {
        console.log('Speech succesfully patched. Speech:', doc.data())
        return doc.data()
      }
    })
}
export function postSpeech(data) {
  return db
    .collection('speeches')
    .add(data)
    .then(doc => {
      console.log('Doc. written with id:', doc.id)
      db.collection('speeches')
        .doc(doc.id)
        .update({ _id: doc.id, uploadStatus: 'uploading' })
        .then(res => {
          console.log('Speech id successfully written. Speech:', res)
        })
        .catch(error => console.error('Error updating document: ', error))
      return doc.id
    })
    .catch(function(error) {
      console.error('Error writing document: ', error)
    })
}

export function uploadSpeech(file, filename) {
  console.log('uploadSpeech called. File:', file, 'filename:', filename)
  const speechReference = storage.ref('speeches/' + filename)

  return speechReference.put(file)
}
