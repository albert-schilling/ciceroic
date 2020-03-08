import React from 'react'
import { render, waitForElement } from '@testing-library/react'
import { screen } from '@testing-library/jest-dom'
import App from '../App'
import { getSpeeches } from '../services/speechServices'

test('renders "Ciceroic"', async () => {
  const { getByText } = render(<App />)
  const linkElement = getByText(/Ciceroic/i)
  expect(linkElement).toBeInTheDocument()
})

test('renders x speeches depending on number of entries', async () => {
  const { findAllByRole } = render(<App />)
  const speeches = await findAllByRole('region')
  console.log('speeches', speeches)
  console.log('speeches.length', speeches.length)
  expect(
    getSpeeches().then(res => {
      console.log('res', res)
      return res.length
    })
  ).resolves.toBe(speeches.length)
})
