import React from 'react'
import { render } from '@testing-library/react'

import ConfirmedAction from './ConfirmedAction'
describe('ConfirmedAction', () => {
  const { container } = render(<ConfirmedAction />)
  it('tests if the comp. shows a button with default text "Update"', () => {
    expect(container.textContent).toMatch('Update')

    const button = container.querySelector('button')
    expect(container).toContainElement(button)
  })
})
