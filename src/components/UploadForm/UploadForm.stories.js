import React from 'react'
import UploadForm from './UploadForm'
import { mobile } from '../../common/storybookDecorator'

import initialSpeech from '../../data/initialSpeech'

export default {
  title: 'Components/Forms/UploadForm',
  component: UploadForm,
}

export const DefaultUploadForm = () => (
  <UploadForm
    title="Default UploadForm"
    newSpeech={initialSpeech}
    modal={'upload'}
  />
)
