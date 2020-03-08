import React from 'react'
import styled from 'styled-components/macro'

import SpeechCard from './SpeechCard'
export default function SpeechesList({ speeches, setSpeech, speechBasePath }) {
  return (
    <Main>
      <SpeechesListContainer>
        {speeches.map(speech => {
          return (
            <SpeechCard
              key={speech.id}
              speech={speech}
              setSpeech={setSpeech}
              speechBasePath={speechBasePath}
            />
          )
        })}
      </SpeechesListContainer>
    </Main>
  )
}

const Main = styled.main`
  padding: 20px;
  height: 100%;
  overflow-y: scroll;
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
