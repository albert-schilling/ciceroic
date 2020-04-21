import React, { useState, useEffect } from 'react'
import styled from 'styled-components/macro'
import TextArea from '../Inputs/TextArea/TextArea'
import Select from '../Inputs/Select/Select'
import Input from '../Inputs/Input/Input'
import Button from '../Inputs/Button/Button'
import { speechCategories } from '../../data/speechCategories'
import Message from '../UserMessage/InsideMessage'
import useSpeech from '../../hooks/useSpeech'
import IconClose from '../Icons/IconClose'
import { getSpeeches } from '../../services/speechServices'

const emptySpeech = {
  _id: '',
  filename: '',
  title: '',
  speaker: `firstName lastName`,
  description: '',
  category: 'lecture',
  date: '',
  duration: '',
  userId: `userId`,
  fileUrl: '',
  status: '',
  uploadStatus: '',
}

export default function UploadForm({
  newSpeech = emptySpeech,
  setNewSpeech = () => {},
  user = {},
  profile = {},
  setActivePage = () => {},
  modal = '',
  setModal = () => {},
  setSpeeches = () => {},
  setSpeech = () => {},
}) {
  const [message, setMessage] = useState({
    visible: false,
    text: '',
    style: '',
  })
  const [uploadProgress, setUploadProgress] = useState(0)
  const [fileInfo, setFileInfo] = useState({
    visible: false,
    text: '',
    style: '',
  })
  const [videoFile, setVideoFile] = useState(null)
  const [submitted, setSubmitted] = useState(false)
  const { submitSpeech } = useSpeech()

  useEffect(() => {
    user &&
      user._id &&
      setNewSpeech({
        ...newSpeech,
        userId: user._id,
        speaker: `${profile.firstName} ${profile.lastName}`,
      })
  }, [user, profile])

  useEffect(() => {
    newSpeech.status === 'submitted' && setSubmitted(true)
  }, [newSpeech.status, newSpeech.uploadStatus])
  return (
    <Section
      className={modal === 'upload' && 'visible'}
      onClick={handleClickOnContainer}
      title="container"
    >
      <Wrapper>
        <IconClose position="topright" callback={() => setModal('')} />

        <H2>Let's get started!</H2>
        <Form onSubmit={handleSubmit}>
          {!submitted && (
            <>
              <Input
                name="uploadSpeech"
                callback={handleUpload}
                text="Upload video"
                color="primary"
                styling="m0"
                type="file"
                accept="video/webm, video/mp4"
              />
              <Message message={fileInfo} />
            </>
          )}
          {submitted ? (
            <>
              <Paragraph>Title: {newSpeech.title}</Paragraph>
              <Paragraph>Description: {newSpeech.description}</Paragraph>
              <Paragraph>Category: {newSpeech.category}</Paragraph>
            </>
          ) : (
            <>
              <TextArea
                title="Title"
                name="title"
                id="New Speech Title"
                rows={1}
                callback={handleChange}
                initialValue={newSpeech.title}
              />
              <TextArea
                title="Description"
                name="description"
                id="New Speech Description"
                maxLength="500"
                rows={5}
                callback={handleChange}
                initialValue={newSpeech.description}
              />
              <Select
                name="category"
                placeholder="Choose a category"
                options={speechCategories}
                callback={handleChange}
                initialValue={newSpeech.category}
              />
            </>
          )}
          <Message message={message} />
          {submitted ? (
            <>
              <StatisticsRangeContainer>
                <StatisticsRangeFill value={uploadProgress} />
                <StatisticsRangeNumber>{`${uploadProgress.toFixed(
                  2
                )}%`}</StatisticsRangeNumber>
              </StatisticsRangeContainer>
              {uploadProgress < 100 && (
                <Button
                  name="submitSpeech"
                  type="submit"
                  text={`Your speech is ${newSpeech.uploadStatus}.`}
                  styling="m0 tertiary full-width"
                  disabled={true}
                />
              )}
              {uploadProgress === 100 && (
                <ButtonRow>
                  <Button
                    name="resetSpeech"
                    callback={resetSpeech}
                    text={'Upload another speech?'}
                    styling="m0 secondary full-width"
                  />
                  <Button
                    name="visitSpeech"
                    callback={visitSpeech}
                    text={'See speech'}
                    styling="m0 primary full-width"
                  />
                </ButtonRow>
              )}
            </>
          ) : (
            <Button
              name="submitSpeech"
              type="submit"
              text="Submit your speech"
              styling="m0 secondary full-width"
              disabled={false}
            />
          )}
        </Form>
      </Wrapper>
    </Section>
  )
  function handleChange(event) {
    setNewSpeech({ ...newSpeech, [event.target.name]: event.target.value })
  }
  function handleUpload(event) {
    event.persist()
    const file = event.target.files[0]
    const fileSize = file.size / 1000000000
    const maximumSize = 1
    if (fileSize > maximumSize) {
      return setMessage({
        visible: true,
        text: `Sorry, this file is too big: ${fileSize.toFixed(2)} GB. 
        Maximum file size is ${maximumSize} GB.
        Try to compress your video before uploading it.`,
        style: 'warning',
      })
    }
    if (
      !(
        file.type.includes('video/mp4') ||
        file.type.includes('video/web') ||
        file.type.includes('video/quicktime')
      )
    ) {
      return setMessage({
        visible: true,
        text: 'Sorry, only mp4, webm or mov video files are permitted.',
        style: 'warning',
      })
    }
    setFileInfo({
      visible: true,
      text: `Filename: ${file.name}
      Size: ${(file.size / 1000000).toFixed(2)} mb
      Type: ${file.type}
    `,
    })
    setVideoFile(event.target.files[0])
    setNewSpeech({ ...newSpeech, filename: file.name })
  }
  async function handleSubmit(event) {
    event.persist()
    event.preventDefault()
    if (newSpeech.filename.length === 0) {
      event.target.uploadSpeech.focus()
      return setMessage({
        visible: true,
        text: 'Please, upload your speech before submitting.',
        style: 'warning',
      })
    }
    if (newSpeech.title.length === 0) {
      event.target.title.focus()
      return setMessage({
        visible: true,
        text: 'Please, type in a title for your speech.',
        style: 'warning',
      })
    }
    if (newSpeech.description.length === 0) {
      event.target.description.focus()
      return setMessage({
        visible: true,
        text: 'Please, type in a description for your speech.',
        style: 'warning',
      })
    }
    setMessage({
      visible: true,
      text: `Awesome! You have submitted your speech. 
      Don't close this website until the speech is uploaded.`,
      style: '',
    })
    event.target.submitSpeech.scrollIntoView()
    const submissionDate = new Date().getTime()
    Object.assign(newSpeech, { date: submissionDate, status: 'submitted' })
    setNewSpeech(newSpeech)
    await submitSpeech({
      speech: newSpeech,
      setSpeech: setNewSpeech,
      video: videoFile,
      setUploadProgress,
    })
    getSpeeches().then(res => setSpeeches(res))
  }

  function resetSpeech(event) {
    event.preventDefault()
    setMessage({
      visible: false,
      text: '',
      style: '',
    })
    setUploadProgress(0)
    setFileInfo({
      visible: false,
      text: '',
      style: '',
    })
    setVideoFile(null)
    setSubmitted(false)
    setNewSpeech(emptySpeech)
  }

  function visitSpeech(event) {
    event.preventDefault()
    setSpeech(newSpeech)
    setActivePage('/speech')
    setModal('')
  }
  function handleClickOnContainer(event) {
    event.persist()
    event.target.title === 'container' && setModal('')
  }
}

const Section = styled.section`
  position: fixed;
  top: 0;
  display: none;
  align-content: flex-start;
  justify-items: center;
  grid-gap: 20px;
  margin: 0;
  height: 100vh;
  width: 100%;
  padding: 80px 20px 20px 20px;
  overflow: hidden;
  z-index: 2;
  &.visible {
    display: grid;
  }
`

const Wrapper = styled.div`
  position: relative;
  border: 1px solid var(--secondary-highlight-color);
  background: #fff;
  padding: 20px;
  max-width: 700px;
  overflow-y: scroll;
  > *:last-child {
    padding-bottom: 40px;
  }
`

const H2 = styled.h2`
  font-size: 1.4rem;
  font-weight: 500;
  line-height: 1.8rem;
`

const Form = styled.form`
  display: grid;
  align-content: flex-start;
  grid-gap: 20px;
`

const ButtonRow = styled.section`
  display: grid;
  grid-gap: 8px;
  grid-template: 1fr / 1fr 1fr;
`

const Paragraph = styled.p`
  margin: 0;
  width: 100%;
`
const StatisticsRangeContainer = styled.label`
  display: flex;
  align-items: center;
  justify-content: start;
  grid-gap: 8px;
  font-size: 0.9rem;
  border: 1px solid var(--primary-font-color);
  border-radius: 0;
  height: 28px;
  padding: 2px;
  position: relative;
`
const StatisticsRangeFill = styled.span`
  height: 100%;
  border-radius: 0;
  border: transparent;
  background: var(--highlight-color);
  width: ${props => `${props.value}%`};
`
const StatisticsRangeNumber = styled.span`
  position: absolute;
  left: calc(50% - 4px);
  color: var(--inverse-primary-font-color);
  mix-blend-mode: difference;
  line-height: 1.2rem;
`
