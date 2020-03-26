import React, { useState } from 'react'
import styled from 'styled-components/macro'
import TextAreaInlineLabel from '../Inputs/TextArea/TextAreaInlineLabel'
import Select from '../Inputs/Select/Select'
import BroadInput from '../Inputs/Buttons/BroadInput'
import BroadButton from '../Inputs/Buttons/BroadButton'
import { speechCategories } from '../../data/speechCategories'

const Main = styled.main`
  display: grid;
  align-content: flex-start;
  grid-gap: 20px;
  height: 100%;
  width: 100%;
  padding: 20px;
  background: #fff;
  overflow-y: scroll;
`

export default function UploadForm({
  profile = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    _id: '',
    about: '',
    portrait: '',
  },
  user = { _id: '' },
}) {
  const [message, setMessage] = useState({
    visible: false,
    text: '',
  })
  const [waitingForServer, setWaitingForServer] = useState(false)
  const [uploadDone, setUploadDone] = useState(false)
  const [newSpeech, setNewSpeech] = useState({
    _id: '',
    filename: '',
    title: '',
    speaker: `${profile.firstName} ${profile.lastName}`,
    description: '',
    category: '',
    date: '',
    duration: '',
    userId: `${user._id}`,
  })
  return (
    <Main>
      <h2>Upload your speech!</h2>
      <BroadInput
        name="uploadSpeech"
        callback={handleUpload}
        text="Upload speech"
        color="primary"
        styling="m0"
        type="file"
        accept="video/webm, video/mp4"
      />
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
      <BroadButton
        name="submitSpeech"
        callback={handleSubmit}
        text="Submit your speech"
        color="secondary"
        styling="m0"
        disabled={!uploadDone}
      />
    </Main>
  )
  function handleChange(event) {
    setNewSpeech({ ...newSpeech, [event.target.name]: event.target.value })
    console.log('newSpeech', newSpeech)
    console.log('event', event)
  }
  function handleUpload(event) {
    const obj = {
      lastModified: 1456436676000,
      name: 'Albert Schilling-Bewerbungsfoto.jpg',
      size: 55259,
      type: 'image/jpeg',
      webkitRelativePath: '',
    }
    event.persist()
    console.log(event)
    const file = event.target.files[0]
    setNewSpeech({ ...newSpeech, filename: file.name })
  }
  function handleSubmit(event) {
    // console.log(event)
    console.log('speech submitted', newSpeech)
  }
}
