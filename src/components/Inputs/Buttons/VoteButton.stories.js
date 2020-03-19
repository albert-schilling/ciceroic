import React from 'react'
import VoteButton from './VoteButton'

const sectionStyles = {
  padding: '20px',
  width: '600px',
  background: '#fff',
  margin: '20px auto',
}

export default {
  title: 'Components/Inputs/Buttons/VoteButton',
  decorators: [storyFn => <section style={sectionStyles}>{storyFn()}</section>],
  component: VoteButton,
}

export const DefaultVoteButton = () => {
  return <VoteButton />
}
