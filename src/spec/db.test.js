import { db } from '../services/firebase'
import { addUser } from '../services/userServices'

// setup and teardown of emulated test db from firebase/testing
// import { getTestDB, clearTestDB, firebase } from './setupFirebaseTestApp'
// import { testUserData } from './testData'

const id = Math.floor(Math.random() * 1000).toString()
const testUser = {
  _id: id,
  uid: id,
  email: `${id}@testing.de`,
  firstName: `${id}FirstName`,
  lastName: `${id}LastName`,
  emailVerified: false,
  portrait: 'url-to-portrait',
}

describe('test user collection', () => {
  // let db
  // let ref

  // Applies only to tests in this describe block
  beforeAll(async () => {
    // emulated test db with firebase/testing -> setup db
    // db = await getTestDB(
    //   { uid: 'testuser', email: 'testuser@testing.com' },
    //   testUserData
    // )
    // ref = db.collection('users')
  })

  afterAll(async () => {
    // emulated test db with firebase/testing -> teardown db
    // await clearTestDB()
  })

  it('check that the user collection has entries', async () => {
    await addUser({
      user: testUser,
      firstName: testUser.firstName,
      lastName: testUser.lastName,
    })
    const size = await db
      .collection('users')
      .get()
      .then(snapshot => snapshot.size)
    expect(size > 0).toBe(true)
  })

  it.skip('check that the user collection has the exact amount of entries as the testUserData', async () => {
    const size = await ref.get().then(snapshot => snapshot.size)
    expect(size).toBe(10)
    expect(Object.entries(testUserData).length).toBe(10)
    expect(size === Object.entries(testUserData).length).toBe(true)
  })
})
