import React from 'react'
import { render } from '@testing-library/react'

import DeleteUser from './DeleteUser'
describe('DeleteUser', () => {
  const { container } = render(<DeleteUser />)
  it('tests if the comp. shows a delete button', () => {
    expect(container.textContent).toMatch('Delete')

    const button = container.querySelector('button')
    expect(container).toContainElement(button)
  })
})
