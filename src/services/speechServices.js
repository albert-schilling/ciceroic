import { db } from './firebase'

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
        return doc.data()
      }
    })
}
