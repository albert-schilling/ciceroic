import React, { useState } from 'react'
import styled from 'styled-components/macro'
import { authentication } from '../../services/firebase'
import { signUp } from '../../services/userServices'
import BroadButton from '../Inputs/Buttons/BroadButton'
import PopUp from '../Interfaces/PopUp/PopUp'
import PrivacyPolicy from '../Content/PrivacyPolicy'
// const PrivacyPolicy = require('../Content/PrivacyPolicy')
import Terms from '../Content/Terms'
// const Terms = require('../Content/Terms')

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
  max-width: 400px;
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
const Checkbox = styled.label`
  line-height: 140%;
  display: grid;
  grid-template: auto / auto auto;
  grid-gap: 8px;
  align-items: flex-start;
  > input:first-child {
    margin-top: 4px;
  }
`

const CheckboxText = styled.p`
  margin: 0;
  line-height: 140%;
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

export default function UserForm({ profile, setProfile, history }) {
  const [message, setMessage] = useState({
    visible: false,
    text: '',
  })
  const [waitingForServer, setWaitingForServer] = useState(false)
  const [showResetPasswordButton, setShowResetPasswordButton] = useState(false)

  return (
    <>
      <Claim>Become a great speaker like Cicero.</Claim>
      <p>Sign up. It's for free.</p>
      <Form onSubmit={handleSubmit}>
        <Input
          type="email"
          name="email"
          placeholder="Enter your E-Mail"
          onChange={handleChange}
          value={profile.email}
        />
        <Input
          type="password"
          name="password"
          placeholder="Password"
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
        <Checkbox for="terms">
          <input
            type="checkbox"
            id="terms"
            name="terms"
            value="terms"
            onChange={handleCheck}
            checked={profile.terms}
          />
          <CheckboxText>
            I have read and agree to the{' '}
            <PopUp size={'medium'}>
              {'Terms of use'}
              <Terms />
            </PopUp>{' '}
            and{' '}
            <PopUp size={'medium'}>
              {'Privacy Policy'}
              <PrivacyPolicy />
            </PopUp>
            .
          </CheckboxText>
        </Checkbox>

        <Checkbox for="newsletter">
          <input
            type="checkbox"
            id="newsletter"
            name="newsletter"
            value="newsletter"
            onChange={handleCheck}
            checked={profile.newsletter}
          />
          Yes, I would like to receive updates by email from Ciceroic.
        </Checkbox>

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
  )
  function handleChange(event) {
    setProfile({ ...profile, [event.target.name]: event.target.value })
  }
  function handleCheck(event) {
    event.preventDefault()
    setProfile({ ...profile, [event.target.name]: event.target.checked })
  }

  function handleSubmit(event) {
    event.preventDefault()
    setShowResetPasswordButton(false)

    const emailValidationPattern = new RegExp(/\S+@\S+\.\S+/)
    const nameValidationPattern = new RegExp(
      /^[\s\r\na-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒß-]+$/gm
    )
    const testFirstName = nameValidationPattern.test(profile.firstName)
    // const testLastName = nameValidationPattern.test(profile.lastName)

    if (!emailValidationPattern.test(profile.email)) {
      event.target.email.focus()
      return setMessage({
        visible: true,
        text: 'Please, enter a valid email address.',
      })
    }
    if (profile.password.length < 8) {
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
    if (!profile.terms) {
      event.target.terms.focus()
      return setMessage({
        visible: true,
        text:
          'You have to agree to the terms of use and the privacy policy to join Ciceroic.',
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
      visible: true,
      style: 'confirmation',
      text: `Welcome to Ciceroic! 
      Your registration is going to be processed.`,
    })

    signUp({ ...profile })
      .then(res => {
        if (res.code === 'auth/email-already-in-use') {
          setShowResetPasswordButton(true)
          return setMessage({
            visible: true,
            text:
              'Sorry, this email address is already in use. Forgot your password?',
          })
        }
        setMessage({
          visible: true,
          style: 'confirmation',
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
