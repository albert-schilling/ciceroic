import React from 'react'
import { mobile } from '../../../common/storybookDecorator'
import PopUp from './PopUp'

export default {
  title: 'Components/Interfaces/PopUp',
  decorators: [storyFn => <section style={mobile}>{storyFn()}</section>],
  component: PopUp,
}

export const SmallPopUp = () => {
  return (
    <PopUp size={'small'}>
      {'Click me'}
      {'Pop Up text in Small Wrapper with max-width: 400px'}
    </PopUp>
  )
}
export const MediumPopUp = () => {
  return (
    <PopUp size={'medium'}>
      {'Click me'}
      {'Pop Up text in Medium Wrapper with max-width: 700px'}
    </PopUp>
  )
}
export const LargePopUp = () => {
  return (
    <PopUp size={'large'}>
      {'Click me'}
      {'Pop Up text in Large Wrapper with max-width: 1200px'}
    </PopUp>
  )
}
