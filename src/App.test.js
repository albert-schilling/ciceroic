import { render, act, wait } from '@testing-library/react'
// import { getTestDB, clearTestDB } from './spec/setupFirebaseTestApp'
import React from 'react'
import App from './App'
import { postSpeech, getSpeeches } from './services/speechServices'
// import testData from './spec/testData'

// let db

// beforeAll(async () => {
//   db = await getTestDB(
//     { uid: 'testuser', email: 'testuser@testing.com' },
//     testData
//   )
// })

// afterAll(async () => {
//   await clearTestDB()
// })

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

test('renders "Ciceroic"', async () => {
  let logo
  act(() => {
    const { getByRole } = render(<App />)
    logo = getByRole('banner')
  })

  expect(logo).toBeInTheDocument()
})

test.skip('renders all speeches from db', async () => {
  // await postSpeech({ speech: testSpeech })
  let speeches
  act(() => {
    const { findAllByTestId } = render(<App />)
    speeches = findAllByTestId(/speech/)
  })

  const speechesFromDb = await getSpeeches({
    // db
  })
  expect(speeches).toBeDefined()
  expect(Array.isArray(speeches)).toBe(true)
  expect(speeches[0].className).toMatch(/SpeechCard__SpeechCardBody/)
  expect(speeches.length).toEqual(speechesFromDb.length)
})
