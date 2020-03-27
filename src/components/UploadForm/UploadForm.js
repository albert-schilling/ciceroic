import React, { useState, useEffect } from 'react'
import styled from 'styled-components/macro'
import TextAreaInlineLabel from '../Inputs/TextArea/TextAreaInlineLabel'
import Select from '../Inputs/Select/Select'
import BroadInput from '../Inputs/Buttons/BroadInput'
import BroadButton from '../Inputs/Buttons/BroadButton'
import { speechCategories } from '../../data/speechCategories'
import Message from '../UserMessage/InsideMessage'
import useSpeech from '../../hooks/useSpeech'
import IconClose from '../Inputs/Icons/IconClose'

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
  history,
  activePage = '',
  setActivePage = () => {},
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
  console.log('activePage in UploadForm', activePage)
  return (
    <Section className={activePage === '/upload' && 'visible'}>
      <Wrapper>
        <IconClose position="topright" callback={() => setActivePage('')} />

        <H2>Let's get started!</H2>
        <Form onSubmit={handleSubmit}>
          {!submitted && (
            <>
              <BroadInput
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
              <TextAreaInlineLabel
                title="Title"
                name="title"
                rows={1}
                callback={handleChange}
                value={newSpeech.title}
              />
              <TextAreaInlineLabel
                title="Description"
                name="description"
                maxLength="250"
                rows={5}
                callback={handleChange}
                value={newSpeech.description}
              />
              <Select
                name="category"
                placeholder="Choose a category"
                options={speechCategories}
                callback={handleChange}
                value={newSpeech.category}
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
              <BroadButton
                name="submitSpeech"
                type="submit"
                text={
                  uploadProgress < 100
                    ? `Your speech is ${newSpeech.uploadStatus}.`
                    : 'Upload complete'
                }
                color="tertiary"
                styling="m0"
                disabled={true}
              />
              {uploadProgress === 100 && (
                <BroadButton
                  name="resetSpeech"
                  callback={resetSpeech}
                  text={'Upload another speech?'}
                  color="primary"
                  styling="m0"
                />
              )}
            </>
          ) : (
            <BroadButton
              name="submitSpeech"
              type="submit"
              text="Submit your speech"
              color="secondary"
              styling="m0"
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
      Please, don't close this window until the speech is uploaded`,
      style: '',
    })
    event.target.submitSpeech.scrollIntoView()
    const submissionDate = new Date().getTime()
    Object.assign(newSpeech, { date: submissionDate, status: 'submitted' })
    setNewSpeech(newSpeech)
    console.log('speech before submission', newSpeech)
    await submitSpeech({
      speech: newSpeech,
      setSpeech: setNewSpeech,
      video: videoFile,
      setUploadProgress,
    })
    console.log('speech submitted', newSpeech)
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
}

const Section = styled.section`
  position: fixed;
  top: 0;
  display: none;
  align-content: flex-start;
  grid-gap: 20px;
  margin: 0;
  padding: 80px 20px 20px 20px;
  overflow-y: scroll;
  height: 100vh;
  width: 100%;
  &.visible {
    display: grid;
  }
`

const Wrapper = styled.div`
  position: relative;
  background: #fff;
  padding: 12px;
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
  border-radius: 14px;
  height: 28px;
  padding: 2px;
  position: relative;
`
const StatisticsRangeFill = styled.span`
  height: 100%;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  border: transparent;
  background: var(--highlight-color);
  border-top-right-radius: ${props =>
    props.dimensionValue === 5 ? '10px' : 0};
  border-bottom-right-radius: ${props =>
    props.dimensionValue === 5 ? '10px' : 0};
  width: ${props => `${props.value}%`};
`
const StatisticsRangeNumber = styled.span`
  position: absolute;
  left: calc(50% - 4px);
  color: var(--inverse-primary-font-color);
  mix-blend-mode: difference;
  line-height: 1.2rem;
`
