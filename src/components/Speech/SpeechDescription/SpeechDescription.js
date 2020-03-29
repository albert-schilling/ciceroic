import React, { useState } from 'react'
import styled from 'styled-components/macro'
import FoldButton from '../../Inputs/Buttons/FoldButton'

export default function SpeechInformation({
  profile = {},
  title,
  speaker,
  description,
  category,
  duration,
  date,
  speakerId = '',
  setSpeakerId = '',
  setShowProfile = () => {},
}) {
  const [visibility, setVisibility] = useState(false)

  return (
    <>
      <Container>
        <header>
          <SpeechTitle>{title}</SpeechTitle>
        </header>

        {profile._id && profile._id === speakerId ? (
          <Speaker>{speaker}</Speaker>
        ) : (
          <Speaker className={'link'} onClick={showProfile}>
            {speaker}
          </Speaker>
        )}
        <SpeechDescription
          className={visibility ? '' : 'hidden'}
          onClick={setVisibilityToTrueIfFalse}
        >
          {description}
          {visibility && <FoldButton callback={() => setVisibility(false)} />}
        </SpeechDescription>
        <SpeechDetails>
          <small>{category}</small>
          {duration && <small>{duration} min</small>}
          <small>{date}</small>
        </SpeechDetails>
      </Container>
    </>
  )
  function setVisibilityToTrueIfFalse() {
    visibility || setVisibility(true)
  }
  function showProfile(event) {
    event.preventDefault()
    setShowProfile(true)
    setSpeakerId(speakerId)
  }
}

const SpeechTitle = styled.h2`
  font-size: 1.4rem;
  font-weight: 500;
  line-height: 1.8rem;
`

const Container = styled.section`
  grid-area: information;
`

const Speaker = styled.h4`
  font-size: 1rem;
  font-weight: 500;
  &.link {
    cursor: pointer;
  }
`

const SpeechDescription = styled.p`
  line-height: 1.4rem;
  &.hidden {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    cursor: pointer;
  }
`

const SpeechDetails = styled.p`
  display: flex;
  justify-content: space-between;
  grid-gap: 4px;
  color: var(--secondary-font-color);
  margin-bottom: 0;
`
