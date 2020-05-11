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

const testUser = getTestUser()
let testUserId

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
  const res = await signUp({ ...testUser })
  testUserId = res.user.uid
})

afterAll(async () => {
  // emulated test db with firebase/testing -> teardown db
  // await clearTestDB()
  await deleteUser({ testUserId })
})

describe('test getUser()', () => {
  const testUser = getTestUser()
  const id = testUser._id
  it('it returns an error if id is undefined', async () => {
    const res = await getUser({ id: undefined })
    expect(typeof res === 'object').toBe(true)
    expect(res instanceof Error).toBe(true)
    expect(res.name).toMatch(/FirebaseError/)
    expect(res.message).toMatch(
      /requires its first argument to be of type non-empty string, but it was: undefined/
    )
  })
  it('it gets the added user from db ', async () => {
    await addUser({
      user: testUser,
      firstName: testUser.firstName,
      lastName: testUser.lastName,
    })
    const userData = await getUser({ id })
    expect(userData._id).toEqual(id)
  })
  it('deletes the new user from db', async () => {
    const res = await deleteUserFromDB({ id })
    expect(res).toBe(true)
  })
  it('checks if the user is removed from db', async () => {
    const res = await getUser({ id })
    expect(res instanceof Error).toBe(true)
    expect(res.message).toMatch(/User not found in db!/)
  })
})

describe.skip('test mock signUp logic with signUp(), addUser() and getUser()', () => {
  const testUser = getTestUser()
  const id = testUser._id
  const signUp = jest.fn(({ user, firstName, lastName }) => {
    addUser({
      user,
      firstName,
      lastName,
    })
  })

  it('signs up a user and checks its existance in the db user collection', async () => {
    await signUp({
      user: testUser,
      firstName: testUser.firstName,
      lastName: testUser.lastName,
    })
    const userData = await getUser({
      id,
    })
    expect(userData._id).toEqual(id)
  })
})

describe('test updateUser()', () => {
  const testUser = getTestUser()
  const id = testUser._id

  it('it adds a user to db', async () => {
    await addUser({
      user: testUser,
      firstName: testUser.firstName,
      lastName: testUser.lastName,
    })
    const userData = await getUser({ id })
    expect(userData._id).toEqual(id)
  })

  it('updates the firstName of the user in db', async () => {
    const newName = 'updatedName'
    testUser.firstName = newName
    await updateUser({
      profile: testUser,
    })
    const userData = await getUser({
      id,
    })
    expect(userData.firstName).toEqual(newName)
  })
  it('adds or updates the url for the user portrait in db', async () => {
    const url = 'url-to-new-portrait'
    await updateUser({
      profile: { ...testUser, portrait: url },
    })
    const userData = await getUser({
      id,
    })
    expect(userData.portrait).toEqual(url)
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
  const testUser = getTestUser()
  const id = testUser._id

  it('it adds a user to db', async () => {
    await addUser({
      user: testUser,
      firstName: testUser.firstName,
      lastName: testUser.lastName,
    })
    const userData = await getUser({ id })
    expect(userData._id).toEqual(id)
  })

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
  const testUser = getTestUser()
  const id = testUser._id

  it('it adds a user to db', async () => {
    await addUser({
      user: testUser,
      firstName: testUser.firstName,
      lastName: testUser.lastName,
    })
    const userData = await getUser({ id })
    expect(userData._id).toEqual(id)
  })
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

describe.skip('test deleteAllUsers()', () => {
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

describe('signUp() and deleteUser() including authentication', () => {
  const testUser = getTestUser()
  let id
  it('signs up a user', async () => {
    const res = await signUp({ ...testUser })
    id = res.user.uid
  })
  it('gets the new user from db', async () => {
    const userData = await getUser({ id })
    expect(userData._id).toEqual(id)
    expect(userData.firstName).toEqual(testUser.firstName)
  })

  it('deletes the new user from db', async () => {
    const res = await deleteUserFromDB({ id })
    expect(res).toBe(true)
  })
  it.skip('deletes the new user from authentication and db in one step', async () => {
    const res = await deleteUser({ id })
    expect(res).toMatch(/successfully deleted/)
  })
  it('checks if the user is removed from db', async () => {
    const res = await getUser({ id })
    expect(res instanceof Error).toBe(true)
    expect(res.message).toMatch(/User not found in db!/)
  })
  it('deletes the new user from authentication', async () => {
    const res = await deleteUserFromAuthentication()
    expect(res).toBe(true)
  })
})
