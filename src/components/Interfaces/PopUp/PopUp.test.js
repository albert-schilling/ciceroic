import React from 'react'
import { render } from '@testing-library/react'

import PopUp from './PopUp'
describe('PopUp', () => {
  const { container } = render(<PopUp />)
  it('tests if the comp. shows anchor tag', () => {
    const anchor = container.querySelector('anchor')
    expect(container).toContainElement(anchor)
  })
})
