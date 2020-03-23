import { db } from './firebase'

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

export { updateUser, updateAbout, updatePortrait }
