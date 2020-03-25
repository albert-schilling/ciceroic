import React from 'react'
import styled from 'styled-components/macro'
import TextAreaInlineLabel from '../TextArea/TextAreaInlineLabel'

const Main = styled.main`
  display: grid;
  justify-self: center;
  align-content: flex-start;
  height: 100%;
  width: 100%;
  padding: 20px;
  background: #fff;
  overflow-y: scroll;
  > *:last-child {
    padding-bottom: 100px;
  }
`

export default function UploadForm() {
  return (
    <Main>
      <h2>Upload your speech!</h2>
      <TextAreaInlineLabel />
      <TextAreaInlineLabel />
    </Main>
  )
}
