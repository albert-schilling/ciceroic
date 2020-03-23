import React, { useState } from 'react'
import styled from 'styled-components/macro'
import PropTypes from 'prop-types'
import { Main } from '../Standard/StandardComponents'
import DefaultButton from '../Inputs/Buttons/DefaultButton'
import BroadButton from '../Inputs/Buttons/BroadButton'
import BroadInput from '../Inputs/Buttons/BroadInput'
import IconSignOut from '../Inputs/Icons/IconSignOut'
import { updateUser, uploadPortrait } from '../../services/userServices'
import IconClose from '../Inputs/Icons/IconClose'
import UserMessage from '../UserMessage/UserMessage'

export default function Profile({
  profile = {
    _id: '23p48qyfguisrhgfiu',
    email: 'maxpower@heroes.world',
    password: 'skdflksdjfgiu',
    firstName: 'Max',
    lastName: 'Power',
    portrait: '',
    about:
      'I joined Ciceroic because I might be a great hero but I am not a heroic speaker.',
  },
  setProfile = () => {},
  logOut = () => {},
}) {
  const [editAbout, setEditAbout] = useState(false)
  const [lightbox, setLightbox] = useState(false)
  const [editPortrait, setEditPortrait] = useState(false)
  const [message, setMessage] = useState({
    visible: false,
    text: '',
    focusRef: null,
  })

  return (
    <Main>
      {lightbox ? (
        <Lightbox>
          <LightboxClose>
            <IconClose color="#fff" callback={() => setLightbox(false)} />
          </LightboxClose>
          <LightboxImage>
            <img
              src={
                profile.portrait.length > 0
                  ? profile.portrait
                  : '/images/default_protrait_cicero_001.jpg'
              }
              alt={
                profile.portrait.length > 0
                  ? `Portrait by ${profile.firstName} ${profile.lastName}`
                  : 'Default image of a user profile on Ciceroic, showing Marcus Tullius Cicero, the great rhetorician from ancient Rome.'
              }
            />
          </LightboxImage>

          <LightboxOptions>
            <BroadButton
              name="deletePortrait"
              callback={handleClick}
              text="Delete"
              color="tertiary"
              styling="m0"
            />
            <BroadInput
              name="uploadPortrait"
              callback={handleUpload}
              text="Upload B"
              color="primary"
              styling="m0"
              type="file"
              accept="image/png, image/jpeg"
            />
          </LightboxOptions>
        </Lightbox>
      ) : (
        <Portrait onClick={() => setLightbox(true)}>
          <img
            src={
              profile.portrait.length > 0
                ? profile.portrait
                : '/images/default_protrait_cicero_001.jpg'
            }
            alt={
              profile.portrait.length > 0
                ? `Portrait by ${profile.firstName} ${profile.lastName}`
                : 'Default image of a user profile on Ciceroic, showing Marcus Tullius Cicero, the great rhetorician from ancient Rome.'
            }
          />
        </Portrait>
      )}

      <Name>
        {profile.firstName} {profile.lastName}
      </Name>
      {editAbout ? (
        <>
          <AboutInput
            name="about"
            value={profile.about}
            onChange={handleChange}
            rows="5"
          />
          <DefaultButton
            name="updateAbout"
            callback={handleClick}
            text="Done"
            color="primary"
          />
        </>
      ) : (
        <>
          <About>{profile.about}</About>
          <DefaultButton
            text="Edit bio"
            color="tertiary"
            callback={() => setEditAbout(true)}
          />
        </>
      )}

      <Paragraph>{profile.email}</Paragraph>
      <DefaultButton text="Change password" color="tertiary" />
      <Line>
        <IconSignOut
          width="20px"
          height="24px"
          color="var(--secondary-font-color)"
          callback={logOut}
        />
        Log out
      </Line>
      {message.visible && (
        <UserMessage message={message} handleClick={handleClickOnUserMessage} />
      )}
    </Main>
  )
  function handleChange(event) {
    setProfile({ ...profile, [event.target.name]: event.target.value })
  }
  function handleClick(event) {
    event.preventDefault()
    if (event.target.name === 'updateAbout') {
      updateUser(profile)
      setEditAbout(false)
    }

    if (event.target.name === 'deletePortrait') {
      setProfile({ ...profile, portrait: '' })
      setLightbox(false)
    }
  }
  function handleUpload(event) {
    event.persist()
    const filename = `user_${profile._id}_portrait_${event.target.files[0].name}`
    const file = event.target.files[0]
    const fileSize = event.target.files[0].size / 1000
    const maximumSize = 2000
    fileSize < maximumSize
      ? uploadPortrait({
          file,
          filename,
          profile,
          setMessage,
          message,
          setProfile,
        })
      : setMessage({
          ...message,
          visible: true,
          text: `Sorry, this file is too big: ${fileSize}kb. 
          Maximum file size is ${maximumSize}kb.`,
        })
    setLightbox(false)
  }

  function handleClickOnUserMessage() {
    setMessage({
      ...message,
      visible: false,
    })
  }
}

Profile.propTypes = {
  profile: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    portrait: PropTypes.string,
    about: PropTypes.string,
  }),
}

const Portrait = styled.section`
  justify-self: center;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin: 0 0 20px 0;
  border: 2px solid var(--light-grey);
  border-radius: 50%;
  width: 150px;
  height: 150px;
  overflow: hidden;
  cursor: pointer;
`
const Name = styled.h3`
  font-size: 1rem;
  font-weight: 500;
`

const About = styled.p`
  margin: 0;
  line-height: 1.4rem;
`

const Paragraph = styled.p`
  margin: 12px 0;
`
const Line = styled.p`
  display: grid;
  grid-template: auto / 20px auto;
  grid-gap: 8px;
  align-items: center;
  margin: 12px 0;
`

const AboutInput = styled.textarea`
  margin: 0;
  border: 1px solid var(--light-grey);
  border-radius: 4px;
  padding: 4px 8px;
  font-family: inherit;
  font-size: 0.9rem;
  line-height: 1.4rem;
  font-weight: inherit;
`

const Lightbox = styled.section`
  position: fixed;
  display: grid;
  grid-template: auto max-content / 1fr;
  width: 100%;
  height: 100%;
  z-index: 2;
  left: 0;
  top: 0;
`
const LightboxImage = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: var(--primary-font-color);
  overflow: hidden;
  > img {
    width: auto;
    height: 100%;
  }
`

const LightboxOptions = styled.section`
  display: grid;
  grid-template: 1fr / 1fr 1fr;
`

const LightboxClose = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 8px;
  right: 8px;
  width: 40px;
  height: 40px;
`
