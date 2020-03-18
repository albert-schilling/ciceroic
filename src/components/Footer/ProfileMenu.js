import React, { useState } from 'react'
import styled from 'styled-components/macro'

export default function ProfileMenu({ logOut = () => {} }) {
  const [visibility, setVisibility] = useState(false)
  return (
    <ProfileMenuContainer>
      <ProfileMenuBar className={visibility ? '' : 'hidden'}>
        <ProfileMenuAnchor onClick={logOut}>
          <svg
            aria-labelledby="LogOutIconTitle LogOutIconDescription"
            width="40"
            height="48"
            viewBox="0 0 40 48"
          >
            <title id="LogOutIconTitle">Log Out</title>
            <desc id="LogOutIconDescription">
              Click here to log out of the application. You will be then
              redirected to sign up page.
            </desc>
            <path
              id="Pfad_317"
              data-name="Pfad 317"
              d="M64.993,20H38.007A3.118,3.118,0,0,0,35,23.28V26h2.787V23.28a.331.331,0,0,1,.293-.32H61.62L51.5,26V65.04H38.007a.331.331,0,0,1-.293-.32V62H35v2.72A3.118,3.118,0,0,0,38.007,68H64.993A3.118,3.118,0,0,0,68,64.72V23.28A3.118,3.118,0,0,0,64.993,20Z"
              transform="translate(-28 -20)"
              fill="#a00"
            />
            <path
              id="Pfad_318"
              data-name="Pfad 318"
              d="M35.2,63.7a.783.783,0,0,0,1.1,1.1L51.8,52.2c.1-.1.2-.1.3-.2h0l.1-.1h0v-.1l.1-.1v-.1l.1-.1a.1.1,0,0,1,.1-.1h0a.1.1,0,0,1,.1-.1h0a1.689,1.689,0,0,0,.3-1h0v-.1h0v-.1h0v-.4h0v-.1h0v-.1h0c-.1-.3-.2-.7-.3-1h0a.1.1,0,0,0-.1-.1h0a.1.1,0,0,0-.1-.1l-.1-.1v-.1l-.1-.1v-.1h0l-.1-.1h0c-.1-.1-.2-.2-.3-.2L36.3,35.2a.783.783,0,0,0-1.1,1.1l9.6,11.8H27.9A1.9,1.9,0,0,0,26,50a1.839,1.839,0,0,0,1.9,1.9H44.8Z"
              transform="translate(-26 -26)"
              fill="#a00"
            />
          </svg>
        </ProfileMenuAnchor>
      </ProfileMenuBar>

      <ProfileIcon onClick={handleClick}>
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
          <g
            id="Gruppe_1"
            data-name="Gruppe 1"
            transform="translate(-178 -396)"
          >
            <path
              id="ic_account_circle_24px"
              d="M26,2A24,24,0,1,0,50,26,24.009,24.009,0,0,0,26,2Zm0,7.2a7.2,7.2,0,1,1-7.2,7.2A7.19,7.19,0,0,1,26,9.2Zm0,34.08a17.281,17.281,0,0,1-14.4-7.728c.072-4.776,9.6-7.392,14.4-7.392,4.776,0,14.328,2.616,14.4,7.392A17.281,17.281,0,0,1,26,43.28Z"
              transform="translate(176 394)"
              fill="#a00"
            />
          </g>
        </svg>
      </ProfileIcon>
    </ProfileMenuContainer>
  )
  function handleClick() {
    setVisibility(!visibility)
  }
}

const ProfileMenuContainer = styled.section`
  display: grid;
  grid-gap: 20px;
  position: fixed;
  bottom: 20px;
  right: 20px;
`
const ProfileMenuBar = styled.nav`
  &.hidden {
    display: none;
  }
`

const ProfileMenuAnchor = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`

const ProfileIcon = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  background: none;
  cursor: pointer;
`
