// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions')

// The Firebase Admin SDK to access the Firebase Realtime Database or Firestore.
const admin = require('firebase-admin')

var firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  databaseURL: process.env.databaseURL,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
  measurementID: process.env.measurementID,
}

admin.initializeApp(firebaseConfig)
const db = admin.firestore()

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

// Take the text parameter passed to this HTTP endpoint and insert it into the
// Firestore Database under the path /messages/:pushId/original
exports.addMessage = functions
  .region('europe-west3')
  .https.onRequest(async (req, res) => {
    // Grab the text parameter.
    const original = req.query.text
    // Push the new message into Firestore DB.
    // Add a new document with a generated id.
    let id
    const ref = await db
      .collection('messages')
      .add({ original: original })
      .then(doc => {
        console.log('Doc after add operation:', doc)
        console.log('Doc. written with id:', doc.id)
        id = doc.id
        return doc
      })
      .catch(error => {
        console.error('Error writing document: ', error)
      })

    const data = await ref
      .get()
      .then(doc => {
        if (doc.exists) {
          return doc.data()
        } else {
          return new Error('Message not found.')
        }
      })
      .catch(error => console.error(error))

    // const data = await db
    //   .collection('messages')
    //   .get(id)
    //   .then(doc => {
    //     if (doc.exists) {
    //       return doc.data()
    //     } else {
    //       return new Error('Message not found.')
    //     }
    //   })
    //   .catch(error => console.error(error))

    console.log('ref', ref)
    console.log('data', data)
    console.log('data.original', data.original)
    // Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
    // res.redirect(303, snapshot.toString())
    res
      .status(200)
      .send(
        `Upload successfull. Your text ${data.original} has been written in the firebase collection "messages".`
      )
  })

// Listens for new messages added to /messages/:messageId and creates an
// uppercase version of the message to /messages/:messageId
exports.makeUppercase = functions
  .region('europe-west3')
  .firestore.document('/messages/{messageId}')
  .onCreate(async (snapshot, context) => {
    // Grab the current value of what was written to Firestore.
    console.log(
      'Document created in firestore db > collection "messages". makeUppercase() called.'
    )
    console.log('context.params.messageId:', context.params.messageId)
    const data = snapshot.data()
    console.log('snapshot.data():', data)
    const original = data.original
    console.log('data.original:', original)
    console.log('Uppercasing started ...')
    const uppercase = original.toUpperCase()
    console.log('original.toUpperCase():', uppercase)

    const promise = db
      .collection('messages')
      .doc(context.params.messageId)
      .set({ uppercase: uppercase }, { merge: true })
      .then(res => {
        console.log('Successfully written message in uppercase.')
        return res
      })
      .catch(error => {
        console.error('Error uppercasing message: ', error)
        return error
      })

    // You must return a Promise when performing asynchronous tasks inside a Functions such as
    // writing to the Firebase Realtime Database / Firestore.
    // Setting an "uppercase" sibling in Firestore returns a Promise.

    return promise
  })
