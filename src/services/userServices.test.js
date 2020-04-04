import { getTestDB, clearTestDB, firebase } from '../spec/setupFirebaseTestApp'
import testData from '../spec/testData'

import {
  signUp,
  addUserToDB,
  updateUser,
  updateAbout,
  uploadPortrait,
  deletePortrait,
  getUser,
  logIn,
} from './userServices'

describe('test user collection', () => {
  let db
  let ref

  // Applies only to tests in this describe block
  beforeAll(async () => {
    db = await getTestDB(
      { uid: 'testuser', email: 'testuser@testing.com' },
      testData
    )
    ref = db.collection('users')
  })

  afterAll(async () => {
    await clearTestDB()
  })

  it('check that the user collection has entries', async () => {
    const size = await ref.get().then(snapshot => snapshot.size)
    expect(size > 0).toBe(true)
  })
  it('check that the user collection has the exact amount of entries as the testData', async () => {
    const size = await ref.get().then(snapshot => snapshot.size)
    expect(size === Object.entries(testData).length).toBe(true)
  })

  // test addUseToDB
})
