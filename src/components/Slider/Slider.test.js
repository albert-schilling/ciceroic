import React from 'react'
import { render } from '@testing-library/react'
import Slider from './Slider'

const speeches = [
  {
    title: 'speech-1-title',
    speaker: 'speech-1-speaker',
    filename: 'speech-1-filename',
    uploadStatus: 'uploaded',
    _id: 'speech-1',
  },
  {
    title: 'speech-2-title',
    speaker: 'speech-2-speaker',
    filename: 'speech-2-filename',
    uploadStatus: 'uploaded',
    _id: 'speech-2',
  },
  {
    title: 'speech-3-title',
    speaker: 'speech-3-speaker',
    filename: 'speech-3-filename',
    uploadStatus: 'uploaded',
    _id: 'speech-3',
  },
]

test('renders slider with speeches', () => {
  const { getByText, getByTestId } = render(
    <Slider title={'test-category'} speeches={speeches} />
  )
  const title = getByText('test-category')
  expect(title).toBeInTheDocument()

  const leftButton = getByTestId(/slider-button-left/)
  expect(leftButton).toBeInTheDocument()

  const rightButton = getByTestId(/slider-button-left/)
  expect(rightButton).toBeInTheDocument()

  const sliderContent = getByTestId(/slider-content/)
  expect(sliderContent).toBeInTheDocument()

  const speech1Title = getByText('speech-1-title')
  expect(speech1Title).toBeInTheDocument()
  const speech1Speaker = getByText('speech-1-speaker')
  expect(speech1Speaker).toBeInTheDocument()
  const speech2Title = getByText('speech-2-title')
  expect(speech2Title).toBeInTheDocument()
  const speech2Speaker = getByText('speech-2-speaker')
  expect(speech2Speaker).toBeInTheDocument()
  const speech3Title = getByText('speech-3-title')
  expect(speech3Title).toBeInTheDocument()
  const speech3Speaker = getByText('speech-3-speaker')
  expect(speech3Speaker).toBeInTheDocument()
})
