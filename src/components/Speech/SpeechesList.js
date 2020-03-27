import React from 'react'
import styled from 'styled-components/macro'
import SpeechCard from './SpeechCard'

export default function SpeechesList({
  speeches,
  setSpeech,
  speechBasePath,
  activePage = '',
  setActivePage = () => {},
}) {
  return (
    <Section
      className={
        activePage.length > 0
          ? activePage === '/speech'
            ? 'hidden'
            : 'blur'
          : ''
      }
    >
      <SpeechesListContainer>
        {speeches.map(speech => {
          return (
            <SpeechCard
              key={speech._id}
              speech={speech}
              setSpeech={setSpeech}
              speechBasePath={speechBasePath}
              setActivePage={setActivePage}
            />
          )
        })}
      </SpeechesListContainer>
    </Section>
  )
}

const Section = styled.section`
  height: 100%;
  overflow-y: scroll;
  &.blur {
    filter: blur(2px);
  }
  &.hidden {
    display: none;
  }
`

const SpeechesListContainer = styled.section`
  margin-bottom: 20px;
  display: grid;
  grid-gap: 8px;
  @media (min-width: 700px) {
    display: flex;
    flex-wrap: wrap;
  }
`
