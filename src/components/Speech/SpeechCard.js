import React from 'react'
import styled from 'styled-components/macro'
import { NavLink } from 'react-router-dom'
import SpeechDescription from './SpeechDescription/SpeechDescription'
import useDate from '../../hooks/useDate'

export default function SpeechCard({
  speech,
  setSpeech,
  speechBasePath,
  setActivePage = () => {},
}) {
  const { convertTimestampToDate } = useDate()

  return (
    <SpeechCardBody role="region">
      {speech.filename === undefined ? (
        <p>Video loading</p>
      ) : (
        <SpeechCardVideo role="img" controls>
          <source src={speech.fileUrl} type="video/mp4" />
        </SpeechCardVideo>
      )}

      <SpeechCardInformation>
        <SpeechDescription
          title={speech.title}
          speaker={speech.speaker}
          description={speech.description}
          category={
            speech.category &&
            speech.category.charAt(0).toUpperCase() + speech.category.slice(1)
          }
          duration={speech.duration}
          date={speech.date && convertTimestampToDate(speech.date)}
        />
        <SpeechEvaluationButton onClick={goToSpeech}>
          Evaluate
        </SpeechEvaluationButton>
      </SpeechCardInformation>
    </SpeechCardBody>
  )

  async function goToSpeech(event) {
    event.preventDefault()
    await setSpeech(speech)
    setActivePage('/speech')
  }
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

const SpeechEvaluationButton = styled.a`
  margin: 16px 0 4px 0;
  align-self: center;
  width: max-content;
  padding: 8px;
  background: var(--primary-bg-color);
  text-align: center;
  color: var(--inverse-primary-font-color);
  text-decoration: none;
  cursor: pointer;
`
