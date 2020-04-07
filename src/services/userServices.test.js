import { getTestDB, clearTestDB } from '../spec/setupFirebaseTestApp'
import testData from '../spec/testData'

import {
  addUserToDB,
  updateUser,
  updateAbout,
  uploadPortrait,
  deletePortrait,
  getUser,
  logIn,
} from './userServices'

const id = Math.floor(Math.random() * 1000).toString()
const testUser = {
  uid: id,
  email: `${id}@testing.de`,
  firstName: `${id}FirstName`,
  lastName: `${id}LastName`,
  emailVerified: false,
}

let db
let ref

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

describe('test getUser()', () => {
  it('it returns an error if id is undefined', async () => {
    const res = await getUser({ db, id })
    console.log('res', res)
    expect(res).toBe(false)
    // expect(res.status).toHaveBeenCalledTimes(1)
    // expect(res.status).toHaveBeenCalledWith(400)
    // expect(userData._id).toEqual(id)
  })
  it('it gets the added user from db', async () => {
    addUserToDB({
      db,
      user: testUser,
      firstName: testUser.firstName,
      lastName: testUser.lastName,
    })
    const userData = await getUser({ db, id })
    expect(userData._id).toEqual(id)
  })
})

describe('test signUp logic with signUp(), addUserToDB() and getUser()', () => {
  const signUp = jest.fn(({ db, user, firstName, lastName }) => {
    addUserToDB({ db, user, firstName, lastName })
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
  it('updates a user in db and retrieves the updated user', async () => {
    const newName = 'updatedName'
    testUser._id = testUser.uid
    testUser.firstName = newName
    await updateUser({ db, profile: testUser })
    const userData = await getUser({ db, id })
    expect(userData.firstName).toEqual(newName)
  })
})

// actually this function is not necessary instead merge can be used with update user
describe('test updateAbout()', () => {
  it('updates the about text of a user and retrieves the updated user', async () => {
    const newAbout = 'New biography'
    testUser._id = testUser.uid
    testUser.about = newAbout
    await updateAbout({ db, profile: testUser })
    const userData = await getUser({ db, id })
    expect(userData.about).toEqual(newAbout)
  })
})
