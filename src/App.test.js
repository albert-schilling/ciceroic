import React from 'react'
import { render } from '@testing-library/react'
import App from './App'

test('renders "React Boilerplate"', () => {
  const { getByText } = render(<App />)
  const linkElement = getByText(/React Boilerplate/i)
  expect(linkElement).toBeInTheDocument()
})
