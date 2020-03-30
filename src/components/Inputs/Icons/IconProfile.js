import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components/macro'

export default function IconProfile({
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
        aria-labelledby="ProfileMenuTitle ProfileMenuDescription"
        width="48"
        height="48"
        viewBox="0 0 48 48"
      >
        <title id="ProfileMenuTitle">Profile Menu</title>
        <desc id="ProfileMenuDescription">
          Click on this button to open the profile menu. There you can access
          your profile, settings and log out.
        </desc>
        <g id="Gruppe_1" data-name="Gruppe 1" transform="translate(-178 -396)">
          <path
            id="ic_account_circle_24px"
            d="M26,2A24,24,0,1,0,50,26,24.009,24.009,0,0,0,26,2Zm0,7.2a7.2,7.2,0,1,1-7.2,7.2A7.19,7.19,0,0,1,26,9.2Zm0,34.08a17.281,17.281,0,0,1-14.4-7.728c.072-4.776,9.6-7.392,14.4-7.392,4.776,0,14.328,2.616,14.4,7.392A17.281,17.281,0,0,1,26,43.28Z"
            transform="translate(176 394)"
            fill="#a00"
          />
        </g>
      </svg>
    </IconContainer>
  )
}

const IconContainer = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${props => props.width};
  height: ${props => props.height};
  cursor: pointer;
`
