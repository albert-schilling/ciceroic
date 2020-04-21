import React from 'react'
import styled from 'styled-components/macro'
import SpeechDescription from '../Description/SpeechDescription'
import Button from '../../Inputs/Button/Button'
import useDate from '../../../hooks/useDate'

export default function SpeechCard({
  profile = {},
  speech,
  setSpeech,
  setActivePage = () => {},
  setModal = () => {},
  speakerId = '',
  setSpeakerId = () => {},
}) {
  const { convertTimestampToDate } = useDate()

  return (
    <SpeechCardBody data-testid={`speech-${speech._id}`}>
      {speech.filename === undefined ? (
        <p>Video loading</p>
      ) : (
        <SpeechCardVideo role="img" controls>
          <source src={speech.fileUrl} type="video/mp4" />
        </SpeechCardVideo>
      )}

      <SpeechCardInformation>
        <SpeechDescription
          profile={profile}
          title={speech.title}
          speaker={speech.speaker}
          speakerId={speech.userId}
          setSpeakerId={setSpeakerId}
          setModal={setModal}
          description={speech.description}
          category={
            speech.category &&
            speech.category.charAt(0).toUpperCase() + speech.category.slice(1)
          }
          duration={speech.duration}
          date={speech.date && convertTimestampToDate(speech.date)}
        />
        {}
        {profile._id && profile._id === speakerId ? (
          <Button
            dataCy="evaluateSpeech"
            text="See evaluations"
            name="See evaluations"
            styling="primary center"
            callback={goToSpeech}
          />
        ) : (
          <Button
            dataCy="evaluateSpeech"
            text="Evaluate"
            name="Evaluate"
            styling="primary center"
            callback={goToSpeech}
          />
        )}
      </SpeechCardInformation>
    </SpeechCardBody>
  )

  async function goToSpeech(event) {
    event.preventDefault()
    setActivePage('')
    await setSpeech(speech)
    setActivePage('/speech')
    setModal('')
  }
}

const SpeechCardBody = styled.article`
  border: 1px solid #eee;
  border-radius: 0;
  padding: 12px;
  background: #ffffff;
  width: 100%;
`

const SpeechCardVideo = styled.video`
  width: 100%;
  height: auto;
`
const SpeechCardInformation = styled.section`
  display: flex;
  flex-direction: column;
`
