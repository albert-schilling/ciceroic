import React from 'react'
import { render, waitForElement } from '@testing-library/react'
import { screen } from '@testing-library/jest-dom'
import App from '../App'
import { getVideos } from '../services/videoServices'

test('renders "Ciceroic"', async () => {
  const { getByText } = render(<App />)
  const linkElement = getByText(/Ciceroic/i)
  expect(linkElement).toBeInTheDocument()
})

test('renders x videos depending on number of entries', async () => {
  const { findAllByRole } = render(<App />)
  const videos = await findAllByRole('region')
  console.log('videos', videos)
  console.log('videos.length', videos.length)
  expect(
    getVideos().then(res => {
      console.log('res', res)
      return res.length
    })
  ).resolves.toBe(videos.length)
})
