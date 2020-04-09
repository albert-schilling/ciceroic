import {
  getSpeeches,
  getSpeech,
  getSpeechesByUser,
  uploadSpeech,
  postSpeech,
  patchSpeech,
  deleteSpeech,
} from './speechServices'
import { getTestDB, clearTestDB } from '../spec/setupFirebaseTestApp'
import { testSpeechData } from '../spec/testData'
import * as video from '../spec/test-video.mov'

let db
const userId = Math.floor(Math.random() * 1000)
const testSpeech = {
  category: 'lecture',
  date: 1585595452083,
  description: `description-of-video`,
  fileUrl: `url-to-video`,
  filename: `filename-of-video`,
  speaker: `speaker-of-video`,
  status: `submitted`,
  title: `title-of-video`,
  userId,
  uploadStatus: 'uploaded',
}

beforeAll(async () => {
  db = await getTestDB(
    { uid: 'testuser', email: 'testuser@testing.com' },
    testSpeechData
  )
})

afterAll(async () => {
  await clearTestDB()
})

describe('getSpeeches()', () => {
  it('returns an array', async () => {
    const res = await getSpeeches({ db })
    expect(Array.isArray(res)).toBe(true)
    expect(res[0].category).toEqual('lecture')
  })
})

describe('postSpeech() and getSpeech()', () => {
  it('posts a speech in db', async () => {
    const id = await postSpeech({ db, speech: testSpeech })
    expect(typeof id).toEqual('string')
    expect(id.length).toBeGreaterThan(0)
  })

  it('posts a speech and retrieves the speech by id', async () => {
    const id = await postSpeech({ db, speech: testSpeech })
    const retrievedSpeech = await getSpeech({ db, id })
    expect(retrievedSpeech._id).toEqual(id)
    expect(retrievedSpeech.category).toEqual('lecture')
    expect(retrievedSpeech.userId).toEqual(userId)
  })
})

describe('patchSpeech()', () => {
  it('posts a speech, then patches the speech and retrieves the updated speech', async () => {
    const id = await postSpeech({ db, speech: testSpeech })
    testSpeech.category = 'comedy'
    await patchSpeech({ db, id, speech: testSpeech })
    const speechData = await getSpeech({ db, id })
    expect(speechData.category).not.toEqual('lecture')
    expect(speechData.category).toEqual(testSpeech.category)
  })
})

describe('getSpeeches()', () => {
  it("posts a speech and then gets the user's speeches by his/her id", async () => {
    const id = await postSpeech({ db, speech: testSpeech })
    const speeches = await getSpeechesByUser({ db, id: userId })
    expect(typeof speeches).toEqual('object')
    expect(Array.isArray(speeches)).toBe(true)
    expect(speeches.length).toBeGreaterThan(0)
    expect(speeches[0].userId).toEqual(userId)
  })
})

// it is not possible to read a file in js due to security/privacy reasons
describe.skip('uploadSpeech()', () => {
  it("posts a speech and then gets the user's speeches by his/her id", async () => {
    const res = await uploadSpeech({ file: video, filename: video.default })
    expect(res).toBeDefined()
  })
})

describe('deleteSpeech()', () => {
  it("returns an error if firstname and lastname does not match 'Cypress'", async () => {
    const res = await deleteSpeech({
      id: 'randomId',
      profile: { firstName: 'Any', lastName: 'User' },
    })

    expect(typeof res === 'object').toBe(true)
    expect(res instanceof Error).toBe(true)
    // expect(res.name).toMatch(/FirebaseError/)
    expect(res.message).not.toMatch(/Some gibberish/)
    expect(res.message).toMatch(
      /Sorry, only the test user is allowed to delete a speech./
    )
  })

  it.only('posts a speech and deletes it afterwards', async () => {
    const id = await postSpeech({
      // db,
      speech: { ...testSpeech, title: 'delete-test' },
    })
    const retrievedSpeech = await getSpeech({
      // db,
      id,
    })
    expect(retrievedSpeech._id).toEqual(id)
    expect(retrievedSpeech.userId).toEqual(userId)
    let res = await deleteSpeech({
      id,
      profile: { firstName: 'Cypress', lastName: 'Cypress' },
    })
    expect(res).toMatch(/successfully deleted/)
    // await setTimeout(() => {
    //   ;() => {}
    // }, 2000)
    res = await getSpeech({
      // db,
      id,
    })
    expect(typeof res === 'object').toBe(true)
    expect(res instanceof Error).toBe(true)
    expect(res.message).toMatch(/Speech not found/)
  })
})
