import React, { useState } from 'react'
import UploadForm from './UploadForm'
import { mobile } from '../../common/storybookDecorator'

export default {
  title: 'Components/UploadForm',
  decorators: [storyFn => <section style={mobile}>{storyFn()}</section>],
  component: UploadForm,
}

export const DefaultUploadForm = () => {
  const [newSpeech, setNewSpeech] = useState({
    _id: '',
    filename: '',
    title: '',
    speaker: `firstName lastName`,
    description: '',
    category: '',
    date: '',
    duration: '',
    userId: `userID`,
  })
  return (
    <UploadForm
      title="Default UploadForm"
      newSpeech={newSpeech}
      setNewSpeech={setNewSpeech}
    />
  )
}
