import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components/macro'
import { AuthConsumer } from '../Auth/AuthContext'
import BroadButton from '../Inputs/Buttons/BroadButton'

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

            <ButtonRow>
              <BroadButton
                name="logIn"
                callback={event => handleClick(event, logIn)}
                text="Login"
                color="tertiary"
                type="submit"
              />

              <NavLinkStyled name="signUp" to={'/signup'}>
                Sign Up
              </NavLinkStyled>
            </ButtonRow>
          </Form>
        </>
      )}
    </AuthConsumer>
  )
  function handleChange(event) {
    setProfile({ ...profile, [event.target.name]: event.target.value })
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
const ButtonRow = styled.section`
  display: grid;
  grid-gap: 8px;
  grid-template: 1fr / 1fr 1fr;
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
