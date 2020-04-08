import { getTestDB, clearTestDB } from '../spec/setupFirebaseTestApp'
import testData from '../spec/testData'
import { addUser, updateUser, getUser } from './userServices'

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

let db

beforeAll(async () => {
  db = await getTestDB(
    { uid: 'testuser', email: 'testuser@testing.com' },
    testData
  )
  addUser({
    db: db,
    user: testUser,
    firstName: testUser.firstName,
    lastName: testUser.lastName,
  })
})

afterAll(async () => {
  await clearTestDB()
})

describe('test getUser()', () => {
  it('it returns an error if id is undefined', async () => {
    const res = await getUser({ db, id: undefined })
    console.log('typeof', typeof res)

    expect(typeof res === 'object').toBe(true)
    expect(res instanceof Error).toBe(true)
    expect(res.name).toMatch(/FirebaseError/)
    expect(res.message).toMatch(
      /requires its first argument to be of type non-empty string, but it was: undefined/
    )
    // expect(res).toContain(/FirebaseError/)
  })
  it('it gets the added user from db', async () => {
    const secondId = Math.floor(Math.random() * 1000).toString()
    const testUser2 = {
      _id: secondId,
      uid: secondId,
      email: `${secondId}@testing.de`,
      emailVerified: false,
      firstName: `${secondId}FirstName`,
      lastName: `${secondId}LastName`,
    }
    await addUser({
      db,
      user: testUser2,
      firstName: testUser2.firstName,
      lastName: testUser2.lastName,
    })
    const userData = await getUser({ db, id: secondId })
    expect(userData._id).toEqual(secondId)
  })
})

describe('test signUp logic with signUp(), addUser() and getUser()', () => {
  const signUp = jest.fn(({ db, user, firstName, lastName }) => {
    addUser({ db, user, firstName, lastName })
  })

  it('signs up a user and checks its existance in the db user collection', async () => {
    await signUp({
      db,
      user: testUser,
      firstName: testUser.firstName,
      lastName: testUser.lastName,
    })
    const userData = await getUser({ db, id })
    expect(userData._id).toEqual(id)
  })
})

describe('test updateUser()', () => {
  it('updates the firstName of the user in db', async () => {
    const newName = 'updatedName'
    testUser.firstName = newName
    await updateUser({ db, profile: testUser })
    const userData = await getUser({ db, id })
    expect(userData.firstName).toEqual(newName)
  })
  it('adds or updates the url for the user portrait in db', async () => {
    const url = 'url-to-new-portrait'
    await updateUser({ db, profile: { ...testUser, portrait: url } })
    const userData = await getUser({ db, id })
    expect(userData.portrait).toEqual(url)
  })
})

describe('test uploadPortrait()', () => {
  const uploadPortrait = jest.fn(({ db, profile, url }) => {
    updateUser({ db, profile: { ...profile, portrait: url } })
  })

  it('uploads a user portrait and set the url in db', async () => {
    const url = 'url-to-new-portrait'
    await uploadPortrait({ db, profile: testUser, url: url })
    const userData = await getUser({ db, id })
    expect(userData.portrait).toEqual(url)
  })
})

describe('test deletePortrait()', () => {
  const deletePortrait = jest.fn(({ db, profile }) => {
    updateUser({ db, profile: { ...profile, portrait: '' } })
  })
  it('deletes a user portrait from storage and sets the url to empty string in db', async () => {
    await deletePortrait({ db, profile: testUser })
    const userData = await getUser({ db, id })
    expect(userData.portrait).toEqual('')
  })
})
