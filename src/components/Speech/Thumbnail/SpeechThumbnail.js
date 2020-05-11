import React from 'react'
import styled from 'styled-components/macro'

export default function SpeechThumbnail({
  speech = {},
  setSpeech = () => {},
  setActivePage = () => {},
  setModal = () => {},
}) {
  return (
    <SpeechThumbnailBody
      data-testid={`speech-thumbnail-${speech._id}`}
      onClick={goToSpeech}
    >
      {speech.filename === undefined && <p>Video not found.</p>}
      {speech.uploadStatus === 'uploading' && <p>Video is being uploaded.</p>}
      {speech.uploadStatus === 'uploaded' && (
        <SpeechThumbnailVideo role="img" controls>
          <source src={speech.fileUrl} type="video/mp4" />
        </SpeechThumbnailVideo>
      )}

      <SpeechThumbnailInformation>
        <SpeechTitle>{speech.title}</SpeechTitle>
        <Speaker>{speech.speaker}</Speaker>
      </SpeechThumbnailInformation>
    </SpeechThumbnailBody>
  )

  async function goToSpeech(event) {
    event.preventDefault()
    setActivePage('')
    await setSpeech(speech)
    setActivePage('/speech')
    setModal('')
  }
}

const SpeechThumbnailBody = styled.article`
  width: 200px;
  min-width: 200px;
  max-width: 200px;
  border: 1px solid #eee;
  border-radius: 0;
  padding: 12px;
  background: #ffffff;
  cursor: pointer;
`

const SpeechThumbnailVideo = styled.video`
  width: 100%;
  height: auto;
`
const SpeechThumbnailInformation = styled.section`
  display: flex;
  flex-direction: column;
`

const SpeechTitle = styled.h2`
  font-size: 1.4rem;
  font-weight: 500;
  line-height: 1.8rem;
`

const Speaker = styled.h4`
  font-size: 1rem;
  font-weight: 500;
`
