import React, { useState } from 'react'
import styled from 'styled-components/macro'
import { AuthConsumer } from '../Auth/AuthContext'
import BroadButton from '../Inputs/Buttons/BroadButton'
import { authentication } from '../../services/firebase'
import firebase from 'firebase/app'

export default function UserForm({ profile, setProfile, history }) {
  const [message, setMessage] = useState({
    visible: false,
    text: '',
  })
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
          // pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2, 4}$"
          // title="Valid email address"
        />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          defaultValue={profile.password}
        />
        <Input name="firstName" placeholder="Enter your first name" />
        <Input name="lastName" placeholder="Enter your last name" />
        {message.visible && <Message>{message.text}</Message>}
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
  // function handleChange(event) {
  //   setProfile({ ...profile, [event.target.name]: event.target.value.trim() })
  // }
  async function handleSubmit(event) {
    event.preventDefault()
    console.log('event.target', event.target)

    const emailValidationPattern = new RegExp(/\S+@\S+\.\S+/)
    // const nameValidationPattern = new RegExp(
    //   /\pL\pN\pM\x2D\x{2010}-\x{2015}\x{2212}/
    // )
    // const nameValidationPattern = new RegExp(/^[\w&.\-]+$/)
    const pCL =
      'a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ'
    const nameValidationPattern = new RegExp(
      `[${pCL}][${pCL}' ,"-]*[${pCL}'",]+`
    )

    console.log(
      'nameValidationPattern.test(event.target.firstName.value)',
      nameValidationPattern.test(event.target.firstName.value)
    )

    if (!emailValidationPattern.test(event.target.email.value)) {
      event.target.email.focus()
      return setMessage({
        visible: true,
        text: 'Please, enter a valid email address.',
      })
    }
    if (event.target.password.value.length < 8) {
      event.target.password.focus()
      return setMessage({
        visible: true,
        text: 'Please, enter a valid password with at least 8 characters.',
      })
    }
    if (event.target.firstName.value.length === 0) {
      event.target.firstName.focus()
      return setMessage({
        visible: true,
        text: 'Please, enter your first name.',
      })
    }

    if (!nameValidationPattern.test(event.target.firstName.value)) {
      event.target.firstName.focus()
      return setMessage({
        visible: true,
        text: 'Any special characters except a hyphen "-" are not allowed.',
      })
    }
    if (event.target.lastName.value.length === 0) {
      event.target.lastName.focus()
      return setMessage({
        visible: true,
        text: 'Please, enter your last name.',
      })
    }

    if (!nameValidationPattern.test(event.target.lastName.value)) {
      event.target.lastName.focus()
      return setMessage({
        visible: true,
        text: 'Any special characters except a hyphen "-" are not allowed.',
      })
    }
    setMessage({
      visible: false,
      text: '',
    })

    // console.log('Signup called')
    console.log('signup', event.target.email)
    console.log('signup', profile)
    // authentication
    //   .createUserWithEmailAndPassword(profile.email, profile.password)
    //   .then(res => {
    //     console.log(res)
    //     history.push('/')
    //   })
    //   .catch(function(error) {
    //     console.error('Error creating new user: ', error)
    //   })
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
  border-radius: 4px;
  padding: 8px 8px 4px 8px;
  font-family: inherit;
  font-size: 1rem;
  font-weight: inherit;
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
`
