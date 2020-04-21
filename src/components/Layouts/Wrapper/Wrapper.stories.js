import React from 'react'
import Wrapper from './Wrapper'
import { mobile } from '../../../common/storybookDecorator'

export default {
  title: 'Components/Layouts/Wrapper',
  decorators: [storyFn => <section style={mobile}>{storyFn()}</section>],
  component: Wrapper,
}

export const SmallWrapper = () => {
  return <Wrapper size={'small'}>Small Wrapper with max-width: 400px</Wrapper>
}
export const MediumWrapper = () => {
  return <Wrapper size={'medium'}>Medium Wrapper with max-width: 700px</Wrapper>
}
export const LargeWrapper = () => {
  return <Wrapper size={'large'}>Large Wrapper with max-width: 1200px</Wrapper>
}
