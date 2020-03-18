import React, { useState } from 'react'
import styled from 'styled-components/macro'
import FoldButton from '../../Inputs/Buttons/FoldButton'

export default function SpeechInformation({
  title,
  speaker,
  description,
  category,
  duration,
  date,
}) {
  const [visibility, setVisibility] = useState(false)

  return (
    <>
      <Container>
        <header>
          <SpeechTitle>{title}</SpeechTitle>
        </header>
        <h3>{speaker}</h3>
        <SpeechDescription
          className={visibility ? '' : 'hidden'}
          onClick={setVisibilityToTrueIfFalse}
        >
          {description}
          {visibility && <FoldButton callback={() => setVisibility(false)} />}
        </SpeechDescription>
        <SpeechDetails>
          <small>{category}</small>
          <small>{duration} min</small>
          <small>{date}</small>
        </SpeechDetails>
      </Container>
    </>
  )
  function setVisibilityToTrueIfFalse() {
    visibility || setVisibility(true)
  }
}

const SpeechTitle = styled.h2`
  font-size: 1.2rem;
  font-weight: 500;
  line-height: 1.6rem;
`

const Container = styled.section`
  grid-area: information;
  h3 {
    font-size: 1rem;
    font-weight: 500;
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
