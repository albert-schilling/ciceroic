import React, { useEffect, useState } from 'react'
import styled from 'styled-components/macro'
import VoteButton from '../Inputs/VoteButton'

export default function SpeechEvaluationFooter({
  evaluation = {},
  profile = {},
  handleVotes = () => {},
}) {
  const [voted, setVoted] = useState({
    upvotes: false,
    downvotes: false,
    flags: false,
  })

  useEffect(() => {
    checkIfUserVoted()
  }, [])

  console.log('voted.upvotes.length', voted.upvotes.length)
  return (
    <FooterContainer>
      <VoteButton
        className={voted.upvotes ? 'voted' : ''}
        id="upvotes"
        name="upvotes"
        disabled={voted ? voted.upvotes : true}
        clickHandler={clickHandler}
        content="&#708;"
        counter={evaluation.upvotes ? evaluation.upvotes.length : 0}
      />
      <VoteButton
        className={voted.downvotes ? 'voted' : ''}
        id="downvotes"
        name="downvotes"
        disabled={voted ? voted.downvotes : true}
        clickHandler={clickHandler}
        content="&#709;"
        counter={evaluation.downvotes ? evaluation.downvotes.length : 0}
      />
      <VoteButton
        className={voted.flags ? 'voted' : ''}
        id="flags"
        name="flags"
        disabled={voted ? voted.flags : true}
        clickHandler={clickHandler}
        content="&#9872;"
        counter={evaluation.flags ? evaluation.flags.length : 0}
      />
    </FooterContainer>
  )

  function clickHandler(event) {
    updateVotes(event)
    handleVotes(event, evaluation)
  }

  function updateVotes(event) {
    console.log('voted before click:', voted)
    Object.assign(voted, { [event.target.name]: !voted[event.target.name] })
    console.log('voted after click:', voted)
    setVoted(voted)
  }

  function checkIfUserVoted() {
    const voteTypes = Object.entries(voted)
    addVoteTypeIfMissing(voteTypes)
    voteTypes.map(type => {
      const userVoted = evaluation[type[0]].some(vote => vote.id === profile.id)
      Object.assign(voted, { [type[0]]: userVoted })
    })
    setVoted(voted)
    console.log('voted:', voted)
  }

  function addVoteTypeIfMissing(voteTypes) {
    voteTypes.forEach(type => {
      const typeName = type[0]
      evaluation.hasOwnProperty(typeName) ||
        Object.assign(evaluation, { [typeName]: [] })
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

// const VoteButton = styled.button`
//   border: none;
//   background: var(--inverse-primary-font-color);

//   padding: 4px;
//   text-align: center;
//   font-size: 1rem;
//   color: var(--primary-font-color);
//   cursor: pointer;
//   &.voted {
//     background: red;
//   }
// `
