import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components/macro'
import { AuthConsumer } from '../Auth/AuthContext'

export default function UserForm({ profile, setProfile }) {
  return (
    <AuthConsumer>
      {({ logIn }) => (
        <>
          <Form>
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
            <ButtonSection>
              <Button name="logIn" onClick={event => handleClick(event, logIn)}>
                Login
              </Button>
              <NavLinkStyled name="signUp" to={'/signup'}>
                Sign Up
              </NavLinkStyled>
            </ButtonSection>
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
  }
  function handleClick(event, callback) {
    event.preventDefault()
    event.target.name = 'logIn' && callback(event)
  }
}
const Form = styled.form`
  display: grid;
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
  border: none;
  padding: 12px;
  background: ${props =>
    props.name === 'signUp' ? 'var(--primary-bg-color)' : '#eee'};
  font-size: 1rem;
  color: ${props =>
    props.name === 'signUp' ? 'var(--inverse-primary-font-color)' : 'inherit'};
  cursor: pointer;
`

const NavLinkStyled = styled(NavLink)`
  border: none;
  padding: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--primary-bg-color);
  font-size: 1rem;
  text-decoration: none;
  color: var(--inverse-primary-font-color);
`
