import React from 'react'
import { render } from '@testing-library/react'

import Modal from './Modal'
describe('Modal', () => {
  const { container } = render(<Modal />)
  it('tests if the comp. shows anchor tag', () => {
    const anchor = container.querySelector('anchor')
    expect(container).toContainElement(anchor)
  })
})
