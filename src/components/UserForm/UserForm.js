import React, { useRef } from 'react'
import { AuthConsumer } from '../Auth/AuthContext'
import styled from 'styled-components/macro'

export default function UserForm() {
  const emailInput = useRef()
  const passwordInput = useRef()
  return (
    <AuthConsumer>
      {({ signUp, logIn }) => (
        <>
          {/* <div className="signup-wrapper"> */}
          <Form>
            <Input
              ref={emailInput}
              type="email"
              name="email"
              placeholder="Enter your E-Mail"
            />
            <Input
              ref={passwordInput}
              type="password"
              name="password"
              placeholder="Password"
            />
            <ButtonSection>
              <Button
                name="logIn"
                onClick={e =>
                  logIn(
                    emailInput.current.value,
                    passwordInput.current.value,
                    e
                  )
                }
              >
                Login
              </Button>
              <Button
                name="signUp"
                onClick={e =>
                  signUp(
                    emailInput.current.value,
                    passwordInput.current.value,
                    e
                  )
                }
              >
                Sign Up
              </Button>
            </ButtonSection>
          </Form>
          {/* </div> */}
        </>
      )}
    </AuthConsumer>
  )
}
const Form = styled.form`
  display: flex;
  flex-direction: column;

  grid-gap: 12px;
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
