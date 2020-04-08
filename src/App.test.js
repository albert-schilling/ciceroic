import { render, act } from '@testing-library/react'
import { getTestDB, clearTestDB } from './spec/setupFirebaseTestApp'
import React from 'react'
import App from './App'
import { getSpeeches } from './services/speechServices'
import testData from './spec/testData'

let db

beforeAll(async () => {
  db = await getTestDB(
    { uid: 'testuser', email: 'testuser@testing.com' },
    testData
  )
})

afterAll(async () => {
  await clearTestDB()
})

test.skip('renders "Ciceroic"', async () => {
  let logo
  act(() => {
    const { getByRole } = render(<App />)
    logo = getByRole('banner')
  })
  expect(logo).toBeInTheDocument()
})

test.skip('renders all speeches from db', async () => {
  let speeches
  await act(() => {
    const { container } = render(<App />)
    speeches = container.querySelectorAll(
      'article[class*="SpeechCard__SpeechCardBody"]'
    )
  })
  let speechesFromDb
  await act(async () => {
    await new Promise(r => setTimeout(r, 2000))
    speechesFromDb = await getSpeeches(db)
  })

  expect(speeches.length).toBe(speechesFromDb.length)
})
