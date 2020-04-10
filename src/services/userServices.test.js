// setup and teardown of emulated test db from firebase/testing
// import { getTestDB, clearTestDB } from '../spec/setupFirebaseTestApp'
import {
  signUp,
  addUser,
  updateUser,
  getUser,
  deleteUser,
  deleteAllUsers,
  deleteUserFromAuthentication,
  deleteUserFromDB,
} from './userServices'
import { getTestUser } from '../spec/testData'
import { wait, waitFor } from '@testing-library/react'

const testUser = getTestUser()
const id = testUser._id
// let db

beforeAll(async () => {
  // emulated test db with firebase/testing -> setup db
  // db = await getTestDB({ uid: 'testuser', email: 'testuser@testing.com' })
  // addUser({
  //   db: db,
  //   user: testUser,
  //   firstName: testUser.firstName,
  //   lastName: testUser.lastName,
  // })
  // await deleteAllUsers()
})

afterAll(async () => {
  // emulated test db with firebase/testing -> teardown db
  // await clearTestDB()
})

describe('test getUser()', () => {
  it('it returns an error if id is undefined', async () => {
    const res = await getUser({
      // db,
      id: undefined,
    })
    expect(typeof res === 'object').toBe(true)
    expect(res instanceof Error).toBe(true)
    expect(res.name).toMatch(/FirebaseError/)
    expect(res.message).toMatch(
      /requires its first argument to be of type non-empty string, but it was: undefined/
    )
    // expect(res).toContain(/FirebaseError/)
  })
  it('it gets the added user from db', async () => {
    const newTestUser = getTestUser()
    const newId = newTestUser._id

    await addUser({
      // db,
      user: newTestUser,
      firstName: newTestUser.firstName,
      lastName: newTestUser.lastName,
    })
    const userData = await getUser({
      // db,
      id: newId,
    })
    expect(userData._id).toEqual(newId)
  })
})

describe('test signUp logic with signUp(), addUser() and getUser()', () => {
  const signUp = jest.fn(
    ({
      // db,
      user,
      firstName,
      lastName,
    }) => {
      addUser({
        // db,
        user,
        firstName,
        lastName,
      })
    }
  )

  it('signs up a user and checks its existance in the db user collection', async () => {
    await signUp({
      // db,
      user: testUser,
      firstName: testUser.firstName,
      lastName: testUser.lastName,
    })
    const userData = await getUser({
      // db,
      id,
    })
    expect(userData._id).toEqual(id)
  })
})

describe('test updateUser()', () => {
  it('updates the firstName of the user in db', async () => {
    const newName = 'updatedName'
    testUser.firstName = newName
    await updateUser({
      // db,
      profile: testUser,
    })
    const userData = await getUser({
      // db,
      id,
    })
    expect(userData.firstName).toEqual(newName)
  })
  it('adds or updates the url for the user portrait in db', async () => {
    const url = 'url-to-new-portrait'
    await updateUser({
      // db,
      profile: { ...testUser, portrait: url },
    })
    const userData = await getUser({
      // db,
      id,
    })
    expect(userData.portrait).toEqual(url)
  })
})

describe('test uploadPortrait()', () => {
  const uploadPortrait = jest.fn(
    ({
      // db,
      profile,
      url,
    }) => {
      updateUser({
        // db,
        profile: { ...profile, portrait: url },
      })
    }
  )

  it('uploads a user portrait and set the url in db', async () => {
    const url = 'url-to-new-portrait'
    await uploadPortrait({
      // db,
      profile: testUser,
      url: url,
    })
    const userData = await getUser({
      // db,
      id,
    })
    expect(userData.portrait).toEqual(url)
  })
})

describe('test deletePortrait()', () => {
  const deletePortrait = jest.fn(
    ({
      // db,
      profile,
    }) => {
      updateUser({
        // db,
        profile: { ...profile, portrait: '' },
      })
    }
  )
  it('deletes a user portrait from storage and sets the url to empty string in db', async () => {
    await deletePortrait({
      // db,
      profile: testUser,
    })
    const userData = await getUser({
      // db,
      id,
    })
    expect(userData.portrait).toEqual('')
  })
})

describe('test deleteAllUsers()', () => {
  it('deletes all users from db', async () => {
    await addUser({
      // db,
      user: testUser,
      firstName: testUser.firstName,
      lastName: testUser.lastName,
    })

    const userData = await getUser({
      // db,
      id,
    })
    expect(userData._id).toEqual(id)

    const res = await deleteAllUsers()
    expect(res).toMatch(/All Users successfully deleted./)
  })
})

describe.only('deleteUser() including authentication', () => {
  const newUser = getTestUser()
  let newId
  it('signs up a user', async () => {
    const res = await signUp({ ...newUser })
    newId = res.user.uid
  })
  it('gets the new user from db', async () => {
    const userData = await getUser({ id: newId })
    expect(userData._id).toEqual(newId)
    expect(userData.firstName).toEqual(newUser.firstName)
  })
  it.skip('deletes the new user from authentication', async () => {
    const res = await deleteUserFromAuthentication()
    expect(res).toBe(true)
  })
  it.skip('deletes the new user from db', async () => {
    const res = await deleteUserFromDB({ id: newId })
    expect(res).toMatch(/successfully deleted/)
  })
  it('deletes the new user from authentication and db in one step', async () => {
    const res = await deleteUser({ id: newId })
    expect(res).toMatch(/successfully deleted/)
  })
  it('checks if the user is removed from db', async () => {
    const res = await getUser({ id: newId })
    expect(res instanceof Error).toBe(true)
    expect(res.message).toMatch(/User not found in db!/)
  })
})
