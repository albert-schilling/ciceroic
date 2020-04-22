import { getTestDB, clearTestDB, firebase } from '../spec/setupFirebaseTestApp'

describe.skip('test database access if user is not logged in', () => {
  let db
  let ref

  // Applies only to tests in this describe block
  beforeAll(async () => {
    db = await getTestDB()

    // All paths are secure by default
    ref = db.collection('users')
  })

  afterAll(async () => {
    await clearTestDB()
  })

  it('fails when reading/writing as an unauthorized user', async () => {
    await expect(ref.get()).toDeny()
  })
})

describe.skip('test database access if user is logged in', () => {
  let db
  let ref

  // Applies only to tests in this describe block
  beforeAll(async () => {
    db = await getTestDB({ uid: 'testuser', email: 'testuser@testing.com' })

    // All paths are secure by default
    ref = db.collection('users')
  })

  afterAll(async () => {
    await clearTestDB()
  })

  it('allows when reading/writing as an authorized user', async () => {
    await expect(ref.get()).toAllow()
  })
})
