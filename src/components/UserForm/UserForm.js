import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components/macro'
import { AuthConsumer } from '../Auth/AuthContext'
import DefaultButton from '../Inputs/Buttons/DefaultButton'

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
              <DefaultButton
                name="logIn"
                callback={event => handleClick(event, logIn)}
                text="Login"
                color="tertiary"
              />

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
  display: flex;
  justify-content: space-between;
`

const NavLinkStyled = styled(NavLink)`
  margin: 20px 0 12px 0;
  align-self: center;
  width: max-content;
  border: none;
  padding: 8px;
  text-align: center;
  font-size: 1rem;
  color: var(--inverse-primary-font-color);
  text-decoration: none;
  cursor: pointer;
  background: var(--highlight-color);
`
