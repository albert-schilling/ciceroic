import { db } from '../services/firebase'
import { getTestUser } from '../spec/testData'
import {
  signUp,
  addUser,
  getUser,
  deleteUser,
  deleteUserFromDB,
} from '../services/userServices'
const testUser = getTestUser()
let testUserId

// setup and teardown of emulated test db from firebase/testing
// import { getTestDB, clearTestDB, firebase } from './setupFirebaseTestApp'
// import { testUserData } from './testData'

// Applies only to tests in this describe block
beforeAll(async () => {
  // emulated test db with firebase/testing -> setup db
  // db = await getTestDB(
  //   { uid: 'testuser', email: 'testuser@testing.com' },
  //   testUserData
  // )
  // ref = db.collection('users')

  const res = await signUp({ ...testUser })
  testUserId = res.user.uid
})

afterAll(async () => {
  // emulated test db with firebase/testing -> teardown db
  // await clearTestDB()

  await deleteUser({ testUserId })
})

describe('test user collection', () => {
  const testUser = getTestUser()
  const id = testUser._id

  // let db
  // let ref

  it('it adds a user to db', async () => {
    await addUser({
      user: testUser,
      firstName: testUser.firstName,
      lastName: testUser.lastName,
    })
    const userData = await getUser({ id })
    expect(userData._id).toEqual(id)
  })

  it('check that the user collection has entries', async () => {
    const size = await db
      .collection('users')
      .get()
      .then(snapshot => snapshot.size)
    expect(size > 0).toBe(true)
  })

  it('check that the user collection has the exact amount of one user added to db during test', async () => {
    const size = await db
      .collection('users')
      .get()
      .then(snapshot => snapshot.size)

    const testUser = getTestUser()

    await addUser({
      user: testUser,
      firstName: testUser.firstName,
      lastName: testUser.lastName,
    })
    const newSize = await db
      .collection('users')
      .get()
      .then(snapshot => snapshot.size)
    expect(newSize - size).toBe(1)
  })

  it('deletes the new user from db', async () => {
    const res = await deleteUserFromDB({ id: id })
    expect(res).toBe(true)
  })
  it('checks if the user is removed from db', async () => {
    const res = await getUser({ id })
    expect(res instanceof Error).toBe(true)
    expect(res.message).toMatch(/User not found in db!/)
  })
})
