import React from 'react'
import styled from 'styled-components/macro'
import { AuthConsumer } from '../Auth/AuthContext'

export default function UserForm({ userData, setUserData }) {
  return (
    <AuthConsumer>
      {({ signUp }) => (
        <>
          <Form>
            <h3>Become a great speaker like Cicero.</h3>
            <p>Sign up. It's for free.</p>
            <Input
              type="email"
              name="email"
              placeholder="Enter your E-Mail"
              value={userData.email}
              onChange={handleChange}
            />
            <Input
              type="password"
              name="password"
              placeholder="Password"
              value={userData.password}
              onChange={handleChange}
            />
            <Input
              name="firstName"
              placeholder="Enter your first name"
              value={userData.firstName}
              onChange={handleChange}
            />
            <Input
              name="lastName"
              placeholder="Enter your last name"
              value={userData.lastName}
              onChange={handleChange}
            />
            <ButtonSection>
              <Button name="signUp" onClick={event => signUp(event)}>
                Sign Up
              </Button>
            </ButtonSection>
          </Form>
        </>
      )}
    </AuthConsumer>
  )
  function handleChange(event) {
    event.target.name === 'email' &&
      setUserData({ ...userData, email: event.target.value })
    event.target.name === 'password' &&
      setUserData({ ...userData, password: event.target.value })
    event.target.name === 'firstName' &&
      setUserData({ ...userData, firstName: event.target.value })
    event.target.name === 'lastName' &&
      setUserData({ ...userData, lastName: event.target.value })
  }
}
const Form = styled.form`
  display: flex;
  flex-direction: column;
  grid-gap: 12px;
  h2 {
    margin: 0;
  }
  h3 {
    text-align: center;
    line-height: 1.6rem;
  }
`
const Input = styled.input`
  font-size: 1rem;
`
const ButtonSection = styled.section`
  display: grid;
  grid-template: auto / 1fr 1fr;
  grid-gap: 8px;
`

const Button = styled.button`
  font-size: 1rem;
  border: none;
  padding: 12px;
  background: ${props =>
    props.name === 'signUp' ? 'var(--primary-bg-color)' : '#eee'};

  color: ${props =>
    props.name === 'signUp' ? 'var(--inverse-primary-font-color)' : 'inherit'};
`
