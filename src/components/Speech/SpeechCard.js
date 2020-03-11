import React from 'react'
import styled from 'styled-components/macro'
import { NavLink } from 'react-router-dom'

export default function SpeechCard({ speech, setSpeech, speechBasePath }) {
  console.log('speech._id in speechcard.js', speech._id)

  console.log('route to:', '/speech/' + speech._id)

  return (
    <SpeechCardBody role="region">
      {speech.filename === undefined ? (
        <p>Video loading</p>
      ) : (
        <SpeechCardVideo role="img" controls>
          <source src={speechBasePath + speech.filename} type="video/mp4" />
        </SpeechCardVideo>
      )}

      <SpeechCardInformation>
        <header>
          <SpeechCardHeadline>{speech.title}</SpeechCardHeadline>
        </header>
        <SpeechCardSpeaker>{speech.speaker}</SpeechCardSpeaker>
        <SpeechCardDescription>{speech.description}</SpeechCardDescription>
        <SpeechCardDetails>
          <small>{speech.category}</small>
          <small>{speech.duration} min</small>
          <small>{speech.date}</small>
        </SpeechCardDetails>
        <SpeechEvaluationButton
          onClick={() => setSpeech(speech)}
          to={'/speech/' + speech._id}
        >
          Evaluate
        </SpeechEvaluationButton>
      </SpeechCardInformation>
    </SpeechCardBody>
  )
}

const SpeechCardBody = styled.article`
  background: #ffffff;
  border: 1px solid #eee;
  border-radius: 4px;
  padding: 12px;

  @media (min-width: 700px) {
    width: calc(50% - 4px);
  }
`

const SpeechCardVideo = styled.video`
  width: 100%;
  height: auto;
`
const SpeechCardInformation = styled.section`
  display: flex;
  flex-direction: column;
`
const SpeechCardHeadline = styled.h2`
  margin: 12px 0;
  font-size: 1.2rem;
  line-height: 1.6rem;
`
const SpeechCardSpeaker = styled.h2`
  margin: 0 0 16px 0;
  font-size: 1rem;
`

const SpeechCardDescription = styled.p`
  margin: 0;
  line-height: 1.4rem;
`

const SpeechCardDetails = styled.p`
  display: flex;
  justify-content: space-between;
  grid-gap: 4px;
  color: var(--secondary-font-color);
  margin-bottom: 0;
`

const SpeechEvaluationButton = styled(NavLink)`
  margin: 16px 0 4px 0;
  align-self: center;
  width: max-content;
  padding: 8px;
  background: var(--primary-bg-color);
  text-align: center;
  color: var(--inverse-primary-font-color);
  text-decoration: none;
`
