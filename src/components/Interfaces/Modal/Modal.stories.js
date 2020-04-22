import React from 'react'
import { mobile } from '../../../common/storybookDecorator'
import Modal from './Modal'

export default {
  title: 'Components/Interfaces/Modal',
  decorators: [storyFn => <section style={mobile}>{storyFn()}</section>],
  component: Modal,
}

export const SmallModal = () => {
  return (
    <Modal size={'small'} storybook={true}>
      {'Click me'}
      {'Pop Up text in Small Wrapper with max-width: 400px'}
    </Modal>
  )
}
export const MediumModal = () => {
  return (
    <Modal size={'medium'}>
      {'Click me'}
      {'Pop Up text in Medium Wrapper with max-width: 700px'}
    </Modal>
  )
}
export const LargeModal = () => {
  return (
    <Modal size={'large'}>
      {'Click me'}
      {'Pop Up text in Large Wrapper with max-width: 1200px'}
    </Modal>
  )
}
