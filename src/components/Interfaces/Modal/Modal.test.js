import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import Modal from './Modal'
describe('Modal', () => {
  const { getByTestId } = render(
    <Modal>
      {'show'}
      <p data-testid="modalContent">content</p>
    </Modal>
  )
  it('tests if the comp. shows a button', () => {
    const button = getByTestId('modalButton')
    expect(button.textContent).toEqual('show')
    fireEvent(button, new MouseEvent('click'))
  })
})
