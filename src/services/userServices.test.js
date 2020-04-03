import { getTestDB, clearTestDB, firebase } from '../spec/setupFirebaseTestApp'
import {
  signUp,
  updateUser,
  updateAbout,
  uploadPortrait,
  deletePortrait,
  getUser,
  logIn,
} from './userServices'
// import * as firebase from '@firebase/testing'
// const firebase = require('@firebase/testing')

let app
beforeAll(() => {
  app = getTestDB()
})

afterAll(() => {
  return clearTestDB()
})

describe('test db access of collection users', () => {
  it('returns true if access granted', () => {
    expect(
      firebase.assertSucceeds(
        app
          .firestore()
          .collection('users')
          .get()
      )
    ).resolves.toBe(true)
  })
})

describe('use db users', () => {
  const id = Date.now()

  it('adds a new user to the collection users', () => {
    expect(
      firebase.assertSucceeds(
        app
          .firestore()
          .collection('users')
          .doc()
          .set({
            _id: id,
            firstName: 'first name',
            lastName: 'last name',
            email: 'email address',
            registered: Date.now(),
            emailVerified: false,
          })
      )
    ).resolves.toBe(true)
  })

  it('checks if the newly created user exists', async () => {
    await app
      .firestore()
      .collection('users')
      .get()
      .then(doc => {
        console.log('users', users)
        return doc.data()
      })
    expect(
      firebase.assertSucceeds(
        app
          .firestore()
          .collection('users')
          .where('_id', '==', id)
          .get()
      )
    ).resolves.toBe(true)
  })
})
