import PropTypes from 'prop-types'
import React, { useState, useEffect } from 'react'
import styled from 'styled-components/macro'
import {
  updateUser,
  uploadPortrait,
  deletePortrait,
} from '../../services/userServices'
import BroadButton from '../Inputs/Buttons/BroadButton'
import BroadInput from '../Inputs/Buttons/BroadInput'
import DefaultButton from '../Inputs/Buttons/DefaultButton'
import IconClose from '../Inputs/Icons/IconClose'
import IconSignOut from '../Inputs/Icons/IconSignOut'
import UserMessage from '../UserMessage/UserMessage'
import { authentication } from '../../services/firebase'
import firebase from 'firebase/app'
import SpeechCard from '../Speech/SpeechCard'
import { getSpeechesByUser } from '../../services/speechServices'

const PasswordLabel = styled.label`
  display: grid;
  grid-template: auto auto / 1fr;
  grid-gap: 8px;
  width: 100%;
  margin-bottom: 8px;
`
export default function Settings({
  profile = {
    _id: '',
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    portrait: '',
    about: '',
  },
  setProfile = () => {},
  logOut = () => {},
  activePage = '',
  setActivePage = () => {},

  setSpeech,
  showProfile = false,
  setShowProfile = () => {},
  setSpeakerId = () => {},
}) {
  const [editAbout, setEditAbout] = useState(false)
  const [editPassword, setEditPassword] = useState(false)
  const [allowNewPassword, setAllowNewPassword] = useState(false)
  const [lightbox, setLightbox] = useState(false)
  const [confirmDeletePortrait, setConfirmDeletePortrait] = useState(false)
  const [waitingForServer, setWaitingForServer] = useState(false)
  const [message, setMessage] = useState({
    visible: false,
    text: '',
    focusRef: null,
  })
  const [passwordMessage, setPasswordMessage] = useState({
    visible: false,
    text: '',
  })
  const [authenticationTries, setAuthenticationTries] = useState(0)
  const [speechesByUser, setSpeechesByUser] = useState([])

  useEffect(() => {
    profile._id &&
      getSpeechesByUser(profile._id).then(res => setSpeechesByUser(res))
  }, [profile._id])

  return (
    <Section className={activePage === '/settings' && 'visible'}>
      <Wrapper>
        <IconClose position="topright" callback={() => setActivePage('')} />
        <ProfileSection>
          {lightbox ? (
            <Lightbox>
              <LightboxClose>
                <IconClose color="#fff" callback={() => setLightbox(false)} />
              </LightboxClose>
              <LightboxImage>
                <img
                  src={
                    profile.portrait && profile.portrait.length > 0
                      ? profile.portrait
                      : '/images/default_protrait_cicero_001.jpg'
                  }
                  alt={
                    profile.portrait && profile.portrait.length > 0
                      ? `Portrait by ${profile.firstName} ${profile.lastName}`
                      : 'Default image of a user profile on Ciceroic, showing Marcus Tullius Cicero, the great rhetorician from ancient Rome.'
                  }
                />
              </LightboxImage>

              <LightboxOptions>
                {confirmDeletePortrait ? (
                  <>
                    <LightboxMessage>
                      Are you sure you would like to delete your portrait?
                    </LightboxMessage>
                    <BroadButton
                      name="cancelDeletePortrait"
                      callback={handleClick}
                      text="Cancel"
                      color="tertiary"
                      styling="m0"
                    />
                    <BroadButton
                      name="confirmDeletePortrait"
                      callback={handleClick}
                      text="Delete"
                      color="secondary"
                      styling="m0"
                    />
                  </>
                ) : (
                  <>
                    {profile.portrait && profile.portrait.length > 0 && (
                      <BroadButton
                        name="deletePortrait"
                        callback={handleClick}
                        text="Delete"
                        color="tertiary"
                        styling="m0"
                      />
                    )}

                    <BroadInput
                      name="uploadPortrait"
                      callback={handleUpload}
                      text="Upload"
                      color="primary"
                      styling="m0"
                      type="file"
                      accept="image/png, image/jpeg"
                    />
                  </>
                )}
              </LightboxOptions>
            </Lightbox>
          ) : (
            <Portrait
              onClick={() => setLightbox(true)}
              style={{
                backgroundImage: `url('${
                  profile.portrait && profile.portrait.length > 0
                    ? profile.portrait
                    : '/images/default_protrait_cicero_001.jpg'
                }')`,
              }}
            />
          )}
          <AboutSection>
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
                  text="Edit"
                  color="tertiary"
                  callback={() => setEditAbout(true)}
                />
              </>
            )}
          </AboutSection>
        </ProfileSection>
        <PasswordForm onSubmit={handleSubmitNewPassword}>
          <Paragraph>Email: {profile.email}</Paragraph>

          {editPassword ? (
            <>
              <PasswordLabel htmlFor="oldPassword">
                Confirm current password:
                <Password id="oldPassword" name="oldPassword" type="password" />
              </PasswordLabel>

              {authenticationTries === 3 && (
                <PasswordLabel htmlFor="sendNewPassword">
                  Forgot your password?
                  {waitingForServer ? (
                    <DefaultButton
                      name="sendNewPassword"
                      id="sendNewPassword"
                      text="Send me a new password"
                      color="loading"
                      disabled="true"
                    />
                  ) : (
                    <DefaultButton
                      name="sendNewPassword"
                      id="sendNewPassword"
                      text="Send me a new password"
                      color="secondary"
                      callback={handleClick}
                    />
                  )}
                </PasswordLabel>
              )}
              {allowNewPassword ? (
                <>
                  <PasswordLabel htmlFor="newPassword">
                    New password:
                    <Password
                      id="newPassword"
                      name="newPassword"
                      type="password"
                    />
                  </PasswordLabel>
                  <PasswordLabel htmlFor="repeatNewPassword">
                    Confirm new password:
                    <Password
                      id="repeatNewPassword"
                      name="repeatNewPassword"
                      type="password"
                    />
                  </PasswordLabel>
                  <DefaultButton
                    name="confirmChangePassword"
                    text="Update Password"
                    color="primary"
                    type="submit"
                  />
                </>
              ) : (
                <>
                  {waitingForServer ? (
                    <DefaultButton
                      name="sentOldPassword"
                      text="Update Password"
                      color="loading"
                      type="submit"
                      disabled="true"
                    />
                  ) : (
                    <DefaultButton
                      name="sentOldPassword"
                      text="Update Password"
                      color="primary"
                      type="submit"
                    />
                  )}
                </>
              )}

              <DefaultButton
                name="cancelChangePassword"
                text="Cancel"
                color="tertiary"
                callback={handleClick}
              />
              {passwordMessage.visible && (
                <PasswordMessage>{passwordMessage.text}</PasswordMessage>
              )}
            </>
          ) : (
            <DefaultButton
              name="changePassword"
              text="Change password"
              color="tertiary"
              callback={() => setEditPassword(true)}
            />
          )}
        </PasswordForm>
        <Line>
          <IconSignOut
            width="20px"
            height="24px"
            color="var(--secondary-font-color)"
            callback={loggingOut}
          />
          Log out
        </Line>
        {speechesByUser.length > 0 && (
          <>
            <p>My speeches:</p>
            <Speeches>
              {speechesByUser.map(speech => {
                return (
                  <SpeechCard
                    key={speech._id}
                    profile={profile}
                    speech={speech}
                    setSpeech={setSpeech}
                    setActivePage={setActivePage}
                    speakerId={speech.userId}
                    setSpeakerId={setSpeakerId}
                    showProfile={showProfile}
                    setShowProfile={setShowProfile}
                  />
                )
              })}
            </Speeches>
          </>
        )}

        {message.visible && (
          <UserMessage
            message={message}
            handleClick={handleClickOnUserMessage}
          />
        )}
      </Wrapper>
    </Section>
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
      setConfirmDeletePortrait(true)
    }
    if (event.target.name === 'confirmDeletePortrait') {
      deletePortrait(profile).then(setProfile({ ...profile, portrait: '' }))
      setConfirmDeletePortrait(false)
      setLightbox(false)
    }
    if (event.target.name === 'cancelDeletePortrait') {
      setConfirmDeletePortrait(false)
    }

    if (event.target.name === 'cancelChangePassword') {
      setAllowNewPassword(false)
      setPasswordMessage({ visible: false, text: '' })
      return setEditPassword(false)
    }
    if (event.target.name === 'sendNewPassword') {
      setWaitingForServer(true)
      authentication
        .sendPasswordResetEmail(profile.email)
        .then(() => {
          setWaitingForServer(false)
          setPasswordMessage({ visible: false, text: '' })
          setEditPassword(false)
          setMessage({
            ...message,
            visible: true,
            text: `An email with a link to reset your password has been sent to ${profile.email}`,
          })
        })
        .catch(error => {
          setWaitingForServer(false)
          setPasswordMessage({
            visible: true,
            text:
              'Sorry, there was an error sending an email to reset your password. Please, try again later.',
          })
          console.log(error)
        })
    }
  }

  function handleSubmitNewPassword(event) {
    event.preventDefault()
    allowNewPassword ? updatePassword(event) : reauthenticate(event)
  }

  function handleUpload(event) {
    event.persist()
    const filename = `user_${profile._id}_portrait_${event.target.files[0].name}`
    const file = event.target.files[0]
    const fileSize = event.target.files[0].size / 1000
    const maximumSize = 5000
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
  function updatePassword(event) {
    const newPassword = event.target.newPassword
    const repeatNewPassword = event.target.repeatNewPassword
    if (newPassword.value.length === 0) {
      newPassword.focus()
      return setPasswordMessage({
        visible: true,
        text: 'Please, type in your new password.',
      })
    }
    if (newPassword.value.length < 8) {
      repeatNewPassword.focus()
      return setPasswordMessage({
        visible: true,
        text:
          'Your new password should at least have a length of 8 characters.',
      })
    }
    if (repeatNewPassword.value.length === 0) {
      repeatNewPassword.focus()
      return setPasswordMessage({
        visible: true,
        text: 'Please, confirm your new password.',
      })
    }

    if (newPassword.value !== repeatNewPassword.value) {
      repeatNewPassword.focus()
      return setPasswordMessage({
        visible: true,
        text: 'Your new password and its confirmation are not the same.',
      })
    }

    authentication.currentUser
      .updatePassword(newPassword.value)
      .then(() => {
        reauthenticateUserWithEmailAndPassword(profile.email, newPassword.value)

        setPasswordMessage({
          visible: false,
          text: '',
        })
        setAllowNewPassword(false)
        setEditPassword(false)

        setMessage({
          ...message,
          visible: true,
          text: `Your password has been successfully updated.`,
        })
      })
      .catch(error => {
        console.log(error)
        setPasswordMessage({
          visible: true,
          text:
            'Sorry, there was an error updating your password. Please, try again later.',
        })
      })
  }
  function reauthenticate(event) {
    event.preventDefault()
    const oldPassword = event.target.oldPassword
    if (oldPassword.value.length === 0) {
      oldPassword.focus()
      return setPasswordMessage({
        visible: true,
        text: 'Please, confirm your old password first.',
      })
    }
    reauthenticateUserWithEmailAndPassword(profile.email, oldPassword.value)
  }

  function reauthenticateUserWithEmailAndPassword(email, password) {
    setWaitingForServer(true)
    const credential = firebase.auth.EmailAuthProvider.credential(
      email,
      password
    )
    authentication.currentUser
      .reauthenticateWithCredential(credential)
      .then(res => {
        setPasswordMessage({
          visible: false,
          text: '',
        })
        setWaitingForServer(false)
        setAllowNewPassword(true)
      })
      .catch(error => {
        error.code === 'auth/wrong-password' &&
          setPasswordMessage({
            visible: true,
            text: 'Wrong password, please, try again.',
          })
        setWaitingForServer(false)
        setAuthenticationTries(authenticationTries + 1)
        console.log(error)
      })
  }

  function loggingOut(event) {
    console.log('logging out')
    event.preventDefault()
    setShowProfile(false)
    setActivePage('')
    logOut(event)
  }
}

Settings.propTypes = {
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

const Section = styled.section`
  position: fixed;
  top: 0;
  display: none;
  align-content: flex-start;
  grid-gap: 20px;
  margin: 0;
  padding: 80px 20px 20px 20px;
  overflow-y: scroll;
  height: 100vh;
  width: 100%;
  &.visible {
    display: grid;
  }
`

const Wrapper = styled.div`
  position: relative;
  border: 1px solid var(--secondary-highlight-color);
  background: #fff;
  padding: 12px;
  display: grid;
  justify-self: center;
  align-content: flex-start;
  height: 100%;
  width: 100%;
  padding: 20px;
  background: #fff;
  overflow-y: scroll;
`

const ProfileSection = styled.section`
  display: grid;
  @media (min-width: 700px) {
    display: grid;
    grid-template: auto / 1fr 1fr;
    grid-gap: 40px;
  }
`

const Portrait = styled.section`
  background-size: cover;
  justify-self: center;
  margin: 0 0 20px 0;
  border: 2px solid var(--light-grey);
  border-radius: 50%;
  width: 150px;
  height: 150px;
  overflow: hidden;
  cursor: pointer;
  @media (min-width: 700px) {
    width: 250px;
    height: 250px;
  }
`

const AboutSection = styled.section`
  display: grid;
  grid-gap: 12px;
  align-content: center;
  @media (min-width: 700px) {
    /* grid-area: about; */
  }
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
  width: 100%;
`
const Line = styled.p`
  display: grid;
  grid-template: auto / 20px auto;
  grid-gap: 8px;
  align-items: center;
  margin: 12px 0;
  @media (min-width: 700px) {
    /* grid-area: logout; */
  }
`

const Password = styled.input`
  margin: 0;
  border: 1px solid var(--light-grey);
  border-radius: 4px;
  padding: 4px 8px;
  font-family: inherit;
  font-size: 0.9rem;
  line-height: 1.4rem;
  font-weight: inherit;
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
  left: 0;
  top: 0;
  display: grid;
  grid-template: auto max-content / 1fr;
  width: 100%;
  height: 100%;
  background: var(--primary-font-color);
  z-index: 2;
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
  grid-template: auto auto / 1fr 1fr;
`

const LightboxMessage = styled.p`
  grid-column: span 2;
  margin: 0;
  padding: 12px;
  background: var(--light-grey);
  color: var(--secondary-highlight-color);
  text-align: center;
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

const PasswordForm = styled.form`
  display: flex;
  flex-wrap: wrap;
  height: max-content;
  > input {
    order: 1;
    width: 100%;
    margin-bottom: 12px;
  }
  > button {
    order: 3;
    margin-right: 8px;
  }
`

const PasswordMessage = styled.p`
  order: 2;
  width: 100%;
  border: 1px solid var(--secondary-highlight-color);
  padding: 20px;
  color: var(--secondary-highlight-color);
`

const Speeches = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  > *:nth-child(n) {
    margin-bottom: 12px;
  }
  @media (min-width: 700px) {
    > *:nth-child(n) {
      width: calc(50% - 6px);
    }
  }
`
