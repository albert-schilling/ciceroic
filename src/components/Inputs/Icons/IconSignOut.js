import React from 'react'
import styled from 'styled-components/macro'

export default function IconSignOut({
  callback = () => {},
  width = '40px',
  height = '48px',
  color = null,
}) {
  return (
    <IconContainer
      onClick={callback}
      width={width}
      height={height}
      color={color}
    >
      <svg
        aria-labelledby="LogOutIconTitle LogOutIconDescription"
        width="40px"
        height="48px"
        viewBox="0 0 40 48"
      >
        <title id="LogOutIconTitle">Log Out</title>
        <desc id="LogOutIconDescription">
          Click here to log out of the application. You will be then redirected
          to sign up page.
        </desc>
        <path
          id="Pfad_317"
          data-name="Pfad 317"
          d="M64.993,20H38.007A3.118,3.118,0,0,0,35,23.28V26h2.787V23.28a.331.331,0,0,1,.293-.32H61.62L51.5,26V65.04H38.007a.331.331,0,0,1-.293-.32V62H35v2.72A3.118,3.118,0,0,0,38.007,68H64.993A3.118,3.118,0,0,0,68,64.72V23.28A3.118,3.118,0,0,0,64.993,20Z"
          transform="translate(-28 -20)"
          fill={color ? color : '#a00'}
        />
        <path
          id="Pfad_318"
          data-name="Pfad 318"
          d="M35.2,63.7a.783.783,0,0,0,1.1,1.1L51.8,52.2c.1-.1.2-.1.3-.2h0l.1-.1h0v-.1l.1-.1v-.1l.1-.1a.1.1,0,0,1,.1-.1h0a.1.1,0,0,1,.1-.1h0a1.689,1.689,0,0,0,.3-1h0v-.1h0v-.1h0v-.4h0v-.1h0v-.1h0c-.1-.3-.2-.7-.3-1h0a.1.1,0,0,0-.1-.1h0a.1.1,0,0,0-.1-.1l-.1-.1v-.1l-.1-.1v-.1h0l-.1-.1h0c-.1-.1-.2-.2-.3-.2L36.3,35.2a.783.783,0,0,0-1.1,1.1l9.6,11.8H27.9A1.9,1.9,0,0,0,26,50a1.839,1.839,0,0,0,1.9,1.9H44.8Z"
          transform="translate(-26 -26)"
          fill={color ? color : '#a00'}
        />
      </svg>
    </IconContainer>
  )
}

const IconContainer = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${props => props.width};
  height: ${props => props.height};
  cursor: pointer;
`
