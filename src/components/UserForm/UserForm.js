import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components/macro'
// import { AuthConsumer } from '../Auth/AuthContext'
import BroadButton from '../Inputs/Buttons/BroadButton'
import { logIn } from '../../services/userServices'
import { authentication } from '../../services/firebase'

export default function UserForm({ profile, setProfile }) {
  const [message, setMessage] = useState({
    visible: false,
    text: '',
  })
  const [waitingForServer, setWaitingForServer] = useState(false)
  const [showResetPasswordButton, setShowResetPasswordButton] = useState(false)
  const [authenticationTries, setAuthenticationTries] = useState(0)

  return (
    // <AuthConsumer>
    //   {({ logIn }) => (
    // <>
    <Form onSubmit={handleSubmit}>
      <Input
        type="email"
        name="email"
        placeholder="Enter your E-Mail"
        value={profile.email}
        onChange={handleChange}
      />
      <Input
        type="password"
        name="password"
        placeholder="Password"
        value={profile.password}
        onChange={handleChange}
      />
      {message.visible && <Message>{message.text}</Message>}
      {showResetPasswordButton && (
        <>
          <Paragraph>Have you forgotten your password?</Paragraph>

          {waitingForServer ? (
            <BroadButton
              name="sendNewPassword"
              id="sendNewPassword"
              text="Send me an email to reset my password"
              color="loading"
              disabled="true"
            />
          ) : (
            <BroadButton
              name="sendNewPassword"
              id="sendNewPassword"
              text="Send me an email to reset my password"
              color="secondary"
              callback={resetPassword}
            />
          )}
        </>
      )}

      <ButtonRow>
        <BroadButton name="logIn" text="Login" color="tertiary" type="submit" />

        <NavLinkStyled name="signUp" to={'/signup'}>
          Sign Up
        </NavLinkStyled>
      </ButtonRow>
    </Form>
    //     </>
    //   )}
    // </AuthConsumer>
  )

  function handleChange(event) {
    setProfile({ ...profile, [event.target.name]: event.target.value })
  }
  function handleSubmit(event) {
    event.preventDefault()

    const emailValidationPattern = new RegExp(/\S+@\S+\.\S+/)

    if (!emailValidationPattern.test(profile.email)) {
      event.target.email.focus()
      return setMessage({
        visible: true,
        text: 'Please, enter your email address.',
      })
    }
    if (profile.password.length === 0) {
      event.target.password.focus()
      return setMessage({
        visible: true,
        text: 'Please, enter your password.',
      })
    }
    setWaitingForServer(true)
    logIn({ ...profile }).then(res => {
      if (res.code === 'auth/wrong-password') {
        setWaitingForServer(false)
        setAuthenticationTries(authenticationTries + 1)
        authenticationTries > 2 && setShowResetPasswordButton(true)
        return setMessage({
          visible: true,
          text: 'Wrong password, please, try again.',
        })
      }
      if (res.code === 'auth/too-many-requests') {
        setWaitingForServer(false)
        setAuthenticationTries(3)
        setShowResetPasswordButton(true)
        return setMessage({
          visible: true,
          text: 'Too many unsuccessful tries. Please, try again later.',
        })
      }

      if (res.code === 'auth/user-not-found') {
        return setMessage({
          visible: true,
          text:
            'Sorry, this email has not been found. If you are a new user, please, click the "Sign Up"-button to register.',
        })
      }
    })
  }
  function resetPassword() {
    setWaitingForServer(true)
    authentication
      .sendPasswordResetEmail(profile.email)
      .then(() => {
        setWaitingForServer(false)
        setMessage({
          ...message,
          visible: true,
          text: `An email with a link to reset your password has been sent to ${profile.email}.`,
        })
        setShowResetPasswordButton(false)
      })
      .catch(error => {
        setWaitingForServer(false)
        setMessage({
          visible: true,
          text:
            'Sorry, there was an error sending an email to reset your password. Please, try again later.',
        })
        console.log(error)
      })
  }
}
const Form = styled.form`
  display: grid;
  grid-gap: 12px;
  width: 100%;
  max-width: 400px;
  > * {
    margin: 0;
  }
`
const Input = styled.input`
  border: 1px solid var(--light-grey);
  border-radius: 0;
  padding: 8px 8px 4px 8px;
  font-family: inherit;
  font-size: 1rem;
  font-weight: inherit;
  :focus,
  :invalid {
    box-shadow: 0 0 2px 2px var(--highlight-color);
  }
`
const ButtonRow = styled.section`
  display: grid;
  grid-gap: 8px;
  grid-template: 1fr / 1fr 1fr;
`

const Message = styled.p`
  margin: 12px 0;
  border: 1px solid var(--secondary-highlight-color);
  padding: 20px;
  width: 100%;
  color: var(--secondary-highlight-color);
  line-height: 1.4rem;
`

const NavLinkStyled = styled(NavLink)`
  margin: 12px 0;
  width: 100%;
  border: none;
  padding: 8px;
  text-align: center;
  font-size: 1rem;
  color: var(--inverse-primary-font-color);
  text-decoration: none;
  align-self: center;
  cursor: pointer;
  background: var(--highlight-color);
`

const Paragraph = styled.p`
  margin: 12px 0;
  width: 100%;
`
