import React, { useEffect, useState } from 'react'
import styled from 'styled-components/macro'
import VoteButton from '../Inputs/Buttons/VoteButton'

export default function SpeechEvaluationFooter({
  evaluation = {},
  user = {},
  handleVotes = () => {},
}) {
  const [voted, setVoted] = useState({})
  const voteTypes = ['upvotes', 'downvotes', 'flags']
  const [count, setCount] = useState(0)

  useEffect(() => {
    setVoted(checkIfUserVoted())
  }, [count])

  return (
    <FooterContainer>
      <VoteButton
        className={voted.upvotes ? 'voted' : ''}
        id="upvotes"
        name="upvotes"
        clickHandler={clickHandler}
        content="&#708;"
        counter={evaluation.upvotes ? evaluation.upvotes.length : 0}
      />
      <VoteButton
        className={voted.downvotes ? 'voted' : ''}
        id="downvotes"
        name="downvotes"
        clickHandler={clickHandler}
        content="&#709;"
        counter={evaluation.downvotes ? evaluation.downvotes.length : 0}
      />
      <VoteButton
        className={voted.flags ? 'voted' : ''}
        id="flags"
        name="flags"
        clickHandler={clickHandler}
        content="&#9872;"
        counter={null}
      />
    </FooterContainer>
  )

  function clickHandler(event) {
    setCount(count + 1)
    event.preventDefault()
    updateVotes(event)
    handleVotes(event, evaluation)
  }

  function updateVotes(event) {
    const voteType = event.target.name
    updateOppisiteVote(voteType)
    Object.assign(voted, { [voteType]: !voted[voteType] })
    setVoted(voted)
  }

  function updateOppisiteVote(voteType) {
    voteType === 'upvotes' && Object.assign(voted, { downvotes: false })
    voteType === 'downvotes' && Object.assign(voted, { upvotes: false })
  }

  function checkIfUserVoted() {
    addVoteTypeIfMissing(voteTypes)
    voteTypes.map(type => {
      const userVoted = evaluation[type].some(vote => vote.id === user.id)
      Object.assign(voted, { [type]: userVoted })
    })
    return voted
  }

  function addVoteTypeIfMissing(voteTypes) {
    voteTypes.forEach(type => {
      evaluation.hasOwnProperty(type) ||
        Object.assign(evaluation, { [type]: [] })
    })
  }
}

const FooterContainer = styled.section`
  border: 1px solid var(--light-grey);
  width: 100%;
  background: var(--light-grey);
  display: grid;
  grid-template: auto / 1fr 1fr 1fr;
  grid-gap: 2px;
`
