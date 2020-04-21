import React from 'react'
import FoldButton from './FoldButton'

const sectionStyles = {
  padding: '20px',
  width: '600px',
  background: '#fff',
  margin: '20px auto',
}

export default {
  title: 'Components/Inputs/Buttons/FoldButton',
  decorators: [storyFn => <section style={sectionStyles}>{storyFn()}</section>],
  component: FoldButton,
}

export const DefaultFoldButton = () => {
  return <FoldButton />
}
