import React from 'react'
import styled from 'styled-components/macro'

export default function SpeechThumbnail({
  speech = {},
  setSpeech = () => {},
  setActivePage = () => {},
  setModal = () => {},
}) {
  return speech.filename && speech.uploadStatus === 'uploaded' ? (
    <Container
      data-testid={`speech-thumbnail-${speech._id}`}
      onClick={goToSpeech}
    >
      <Video role="img" controls>
        <source src={speech.fileUrl} type="video/mp4" />
      </Video>

      <Description>
        <Title>{speech.title}</Title>
        <Speaker>{speech.speaker}</Speaker>
      </Description>
    </Container>
  ) : (
    <></>
  )

  async function goToSpeech(event) {
    event.preventDefault()
    setActivePage('')
    await setSpeech(speech)
    setActivePage('/speech')
    setModal('')
  }
}

const Container = styled.article`
  width: 200px;
  min-width: 200px;
  max-width: 200px;
  border: 1px solid #eee;
  border-radius: 0;
  background: #ffffff;
  cursor: pointer;
`

const Video = styled.video`
  width: 100%;
  height: 150px;
  object-fit: cover;
  object-position: center top;
`

const Description = styled.section`
  display: flex;
  flex-direction: column;
`

const Title = styled.h3`
  padding: 0 12px;
  font-size: 1.2rem;
  font-weight: 500;
  line-height: 1.2rem;
`

const Speaker = styled.h4`
  margin-top: 0;
  padding: 0 12px;
  font-size: 1rem;
  font-weight: 500;
`
