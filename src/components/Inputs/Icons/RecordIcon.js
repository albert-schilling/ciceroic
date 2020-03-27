import React from 'react'
import styled from 'styled-components/macro'

export default function RecordIcon({
  callback = () => {},
  width = '48px',
  height = '38.4px',
  color = null,
}) {
  console.log('callback in Record ICon:', callback)
  return (
    <IconContainer
      onClick={callback}
      width={width}
      height={height}
      color={color}
    >
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
    </IconContainer>
  )
}

const IconContainer = styled.a`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${props => props.width};
  height: ${props => props.height};
  bottom: 20px;
  left: 20px;
  cursor: pointer;
`
