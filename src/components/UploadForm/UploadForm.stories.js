import React from 'react'
import UploadForm from './UploadForm'
import { mobile } from '../../common/storybookDecorator'

export default {
  title: 'Components/UploadForm',
  decorators: [storyFn => <section style={mobile}>{storyFn()}</section>],
  component: UploadForm,
}

export const DefaultUploadForm = () => {
  return <UploadForm title="Default UploadForm" />
}
