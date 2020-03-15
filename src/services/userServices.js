// import { db } from './firebase'

// function checkDB() {
//   console.log(db)
// }

// function addUser({ firstName, lastName, birthYear }) {
//   db.collection('users')
//     .add({
//       firstName,
//       lastName,
//       birthYear,
//     })
//     .then(docRef => {
//       console.log('Document written with ID: ', docRef.id)
//       console.log('New Document: ', docRef)
//       const documentId = docRef.id
//       db.collection('users')
//         .doc(docRef.id)
//         .update({
//           _id: documentId,
//           registered: new Date().getTime(),
//         })
//       return documentId
//     })
//     .then(documentId => {
//       db.collection('users')
//         .doc(documentId)
//         .get()
//         .then(doc => {
//           if (doc.exists) {
//             console.log(
//               'Newly created data coming back from firestore:',
//               doc.data()
//             )
//             return doc.data()
//           }
//         })
//     })
//     .catch(error => {
//       console.error('Error adding document: ', error)
//     })
// }

// function getUsers() {
//   db.collection('users')
//     .get()
//     .then(querySnapshot => {
//       querySnapshot.forEach((doc, index) => {
//         const entry = doc.data()
//         console.log(`entry at index ${index} is:`, entry)
//       })
//     })
//     .catch(error => console.error(error))
// }

// export { checkDB, addUser, getUsers }
