import { render, act } from '@testing-library/react'
import React from 'react'
import App from './App'
import { getSpeeches } from './services/speechServices'

test.skip('renders "Ciceroic"', async () => {
  const { getByText } = render(<App />)
  const linkElement = getByText(/Ciceroic/i)
  expect(linkElement).toBeInTheDocument()
})

test.skip('renders all speeches from db', async () => {
  const { container } = render(<App />)
  let speechesFromDb
  await act(async () => {
    await new Promise(r => setTimeout(r, 2000))
    speechesFromDb = await getSpeeches()
  })

  const speeches = container.querySelectorAll(
    'article[class*="SpeechCard__SpeechCardBody"]'
  )
  expect(speeches.length).toBe(speechesFromDb.length)
})
