import React, { useState } from 'react'
import styled from 'styled-components/macro'
import UserMessage from '../UserMessage/UserMessage'

export default function RecordIcon() {
  const [visibility, setVisibility] = useState(false)
  const message = {
    text: `Get your speech up and ready.
    Soon, you will be able to upload it here.`,
  }
  return (
    <>
      <Icon onClick={toggleVisibility}>
        <svg
          aria-labelledby="UploadSpeechIconTitle UploadSpeechIconDescription"
          width="48"
          height="38.4"
          viewBox="0 0 48 38.4"
        >
          <title id="UploadSpeechIconTitle">Upload your Speech</title>
          <desc id="UploadSpeechIconDescription">
            Click here to upload your speech to the platform.
          </desc>
          <path
            id="ic_movie_24px"
            d="M40.4,4l4.8,9.6H38L33.2,4H28.4l4.8,9.6H26L21.2,4H16.4l4.8,9.6H14L9.2,4H6.8A4.794,4.794,0,0,0,2.024,8.8L2,37.6a4.814,4.814,0,0,0,4.8,4.8H45.2A4.814,4.814,0,0,0,50,37.6V4Z"
            transform="translate(-2 -4)"
            fill="#a00"
          />
        </svg>
      </Icon>

      {visibility && (
        <UserMessage message={message} handleClick={toggleVisibility} />
      )}
    </>
  )
  function toggleVisibility() {
    setVisibility(!visibility)
  }
}

const Icon = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 20px;
  left: 20px;
  border: none;
  background: none;
  cursor: pointer;
`
