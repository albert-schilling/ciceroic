import React, { useState, useEffect } from 'react'
import styled from 'styled-components/macro'
import TextAreaInlineLabel from '../Inputs/TextArea/TextAreaInlineLabel'
import Select from '../Inputs/Select/Select'
import BroadInput from '../Inputs/Buttons/BroadInput'
import BroadButton from '../Inputs/Buttons/BroadButton'
import { speechCategories } from '../../data/speechCategories'
import Message from '../UserMessage/InsideMessage'
import useSpeech from '../../hooks/useSpeech'

const Main = styled.main`
  display: grid;
  align-content: flex-start;
  grid-gap: 20px;
  height: 100%;
  width: 100%;
  padding: 20px;
  background: #fff;
  overflow-y: scroll;
  > *:last-child {
    padding-bottom: 100px;
  }
`

const Form = styled.form`
  display: grid;
  align-content: flex-start;
  grid-gap: 20px;
`
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
}) {
  const [message, setMessage] = useState({
    visible: false,
    text: '',
    style: '',
  })
  const [uploadProgress, setUploadProgress] = useState(0)
  const [waitingForServer, setWaitingForServer] = useState(false)
  const [fileInfo, setFileInfo] = useState({
    visible: false,
    text: '',
    style: '',
  })
  const [uploadDone, setUploadDone] = useState(false)
  const [videoFile, setVideoFile] = useState(null)
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

  return (
    <Main>
      <h2>Upload your speech!</h2>
      <Form onSubmit={handleSubmit}>
        <BroadInput
          name="uploadSpeech"
          callback={handleUpload}
          text="Upload speech"
          color="primary"
          styling="m0"
          type="file"
          accept="video/webm, video/mp4"
        />
        <Message message={fileInfo} />
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
        <Message message={message} />
        {waitingForServer ? (
          <>
            <p>Upload Progress: {uploadProgress} %</p>
            <BroadButton
              name="submitSpeech"
              type="submit"
              text="Your speech is being uploaded"
              color="tertiary"
              styling="m0"
              disabled={true}
            />
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
    </Main>
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
    setWaitingForServer(true)
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
}
