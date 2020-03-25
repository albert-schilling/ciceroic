import React, { useState } from 'react'
import styled from 'styled-components/macro'
import { AuthConsumer } from '../Auth/AuthContext'
import BroadButton from '../Inputs/Buttons/BroadButton'
import { authentication } from '../../services/firebase'
import firebase from 'firebase/app'
import { withRouter } from 'react-router-dom'
// import { signUp } from '../Auth/AuthContext'
import { signUp } from '../../services/userServices'
import DefaultButton from '../Inputs/Buttons/DefaultButton'

export default function UserForm({ profile, setProfile, history }) {
  const [message, setMessage] = useState({
    visible: false,
    text: '',
  })
  const [waitingForServer, setWaitingForServer] = useState(false)
  const [showResetPasswordButton, setShowResetPasswordButton] = useState(false)

  return (
    // <AuthConsumer>
    // {({ signUp }) => (
    <>
      <Claim>Become a great speaker like Cicero.</Claim>
      <p>Sign up. It's for free.</p>
      <Form onSubmit={handleSubmit}>
        <Input
          type="email"
          name="email"
          placeholder="Enter your E-Mail"
          defaultValue={profile.email}
          onChange={handleChange}
          value={profile.email}
        />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          defaultValue={profile.password}
          onChange={handleChange}
          value={profile.password}
        />
        <Input
          name="firstName"
          placeholder="Enter your first name"
          onChange={handleChange}
          value={profile.firstName}
        />
        <Input
          name="lastName"
          placeholder="Enter your last name"
          onChange={handleChange}
          value={profile.lastName}
        />

        {message.visible && <Message>{message.text}</Message>}
        {showResetPasswordButton &&
          (waitingForServer ? (
            <BroadButton
              name="sendNewPassword"
              id="sendNewPassword"
              text="Send me a new password"
              color="loading"
              disabled="true"
            />
          ) : (
            <BroadButton
              name="sendNewPassword"
              id="sendNewPassword"
              text="Send me a new password"
              color="secondary"
              callback={resetPassword}
            />
          ))}
        <ButtonRow>
          <BroadButton
            name="cancel"
            callback={() => {
              history.push('/')
            }}
            text="Cancel"
            color="tertiary"
          />
          <BroadButton
            name="signUp"
            text="Sign Up"
            color="primary"
            type="submit"
          />
        </ButtonRow>
      </Form>
    </>
    // )}
    // </AuthConsumer>
  )
  function handleChange(event) {
    setProfile({ ...profile, [event.target.name]: event.target.value })
  }
  function handleSubmit(event) {
    event.preventDefault()
    setShowResetPasswordButton(false)

    const emailValidationPattern = new RegExp(/\S+@\S+\.\S+/)
    const nameValidationPattern = new RegExp(
      /^[\s\r\na-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒß-]+$/gm
    )
    const testFirstName = nameValidationPattern.test(profile.firstName)
    const testLastName = nameValidationPattern.test(profile.lastName)

    if (!emailValidationPattern.test(profile.email)) {
      event.target.email.focus()
      return setMessage({
        visible: true,
        text: 'Please, enter a valid email address.',
      })
    }
    if (profile.email.length < 8) {
      event.target.password.focus()
      return setMessage({
        visible: true,
        text: 'Please, enter a valid password with at least 8 characters.',
      })
    }
    if (profile.firstName.length === 0) {
      event.target.firstName.focus()
      return setMessage({
        visible: true,
        text: 'Please, enter your first name.',
      })
    }

    if (!testFirstName) {
      event.target.firstName.focus()
      return setMessage({
        visible: true,
        text:
          'Any special characters in your first name except a hyphen "-" are not allowed.',
      })
    }

    if (profile.lastName.length === 0) {
      event.target.lastName.focus()
      return setMessage({
        visible: true,
        text: 'Please, enter your last name.',
      })
    }

    // if (!testLastName) {
    //   event.target.lastName.focus()
    //   return setMessage({
    //     visible: true,
    //     text: 'Any special characters except a hyphen "-" are not allowed.',
    //   })
    // }
    setMessage({
      visible: false,
      text: '',
    })

    console.log('profile', profile)

    signUp(profile)
      .then(res => {
        if (res.code === 'auth/email-already-in-use') {
          console.log(res)
          setShowResetPasswordButton(true)
          return setMessage({
            visible: true,
            text:
              'Sorry, this email address is already in use. Forgot your password?',
          })
        }
        setMessage({
          visible: true,
          text: `Welcome to Ciceroic! 
            You will be redirected .`,
        })
        setTimeout(history.push('/'), 3000)
      })
      .catch(error => {
        console.log(
          'Sorry, there was an error with the server. Please try again later.',
          error
        )
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

const Claim = styled.h2`
  text-align: center;
  font-size: 1.2rem;
  line-height: 1.6rem;
  margin: 0;
`

const Form = styled.form`
  display: grid;
  grid-gap: 12px;
  width: 100%;
`
const Input = styled.input`
  margin: 0;
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
  width: 100%;
  border: 1px solid var(--secondary-highlight-color);
  padding: 20px;
  color: var(--secondary-highlight-color);
  line-height: 1.4rem;
`
