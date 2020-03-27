import React from 'react'
import styled from 'styled-components/macro'

export default function IconSignOut({
  callback = () => {},
  width = '20px',
  height = '20px',
  color = null,
  href = '',
  position = 'topright',
}) {
  return (
    <IconContainer
      onClick={callback}
      width={width}
      height={height}
      color={color}
      className={position}
    >
      <svg
        aria-labelledby="CloseIconTitle CloseIconDescription"
        width="40"
        height="40"
        viewBox="0 0 20 20"
      >
        <title id="CloseIconTitle">Close</title>
        <desc id="CloseIconDescription">
          Click here to close the current page or message.
        </desc>
        <path
          id="ic_close_24px"
          d="M25,7.014,22.986,5,15,12.986,7.014,5,5,7.014,12.986,15,5,22.986,7.014,25,15,17.014,22.986,25,25,22.986,17.014,15Z"
          transform="translate(-5 -5)"
          fill={color ? color : '#a00'}
        />
      </svg>
    </IconContainer>
  )
}

const IconContainer = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${props => props.width};
  height: ${props => props.height};
  cursor: pointer;
  &.topright {
    top: 12px;
    right: 12px;
  }
`
