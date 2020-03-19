import React from 'react'
import styled from 'styled-components/macro'
import { AuthConsumer } from '../Auth/AuthContext'
import DefaultButton from '../Inputs/Buttons/DefaultButton'

export default function UserForm({ profile, setProfile, history }) {
  return (
    <AuthConsumer>
      {({ signUp }) => (
        <>
          <Claim>Become a great speaker like Cicero.</Claim>
          <p>Sign up. It's for free.</p>
          <Form onSubmit={signUp}>
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
            <Input
              name="firstName"
              placeholder="Enter your first name"
              value={profile.firstName}
              onChange={handleChange}
            />
            <Input
              name="lastName"
              placeholder="Enter your last name"
              value={profile.lastName}
              onChange={handleChange}
            />

            <ButtonRow>
              <DefaultButton
                name="cancel"
                callback={() => {
                  history.push('/')
                }}
                text="Cancel"
                color="tertiary"
              />
              <DefaultButton
                name="signUp"
                text="Sign Up"
                color="primary"
                type="submit"
              />
            </ButtonRow>
          </Form>
        </>
      )}
    </AuthConsumer>
  )
  function handleChange(event) {
    event.target.name === 'email' &&
      setProfile({ ...profile, email: event.target.value })
    event.target.name === 'password' &&
      setProfile({ ...profile, password: event.target.value })
    event.target.name === 'firstName' &&
      setProfile({ ...profile, firstName: event.target.value })
    event.target.name === 'lastName' &&
      setProfile({ ...profile, lastName: event.target.value })
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
`
const Input = styled.input`
  font-size: 1rem;
`

const ButtonRow = styled.section`
  display: flex;
  justify-content: space-between;
`
