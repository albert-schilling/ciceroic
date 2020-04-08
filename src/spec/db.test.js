import { getTestDB, clearTestDB, firebase } from './setupFirebaseTestApp'
import { testUserData } from './testData'

describe('test user collection', () => {
  let db
  let ref

  // Applies only to tests in this describe block
  beforeAll(async () => {
    db = await getTestDB(
      { uid: 'testuser', email: 'testuser@testing.com' },
      testUserData
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
  it('check that the user collection has the exact amount of entries as the testUserData', async () => {
    const size = await ref.get().then(snapshot => snapshot.size)
    expect(size).toBe(10)
    expect(Object.entries(testUserData).length).toBe(10)
    expect(size === Object.entries(testUserData).length).toBe(true)
  })
})
