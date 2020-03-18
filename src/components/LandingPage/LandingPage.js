import React from 'react'
import styled from 'styled-components/macro'
import UserForm from '../UserForm/UserForm'

export default function LandingPage({ profile, setProfile }) {
  return (
    <Main>
      <Claim>Become a great speaker like Cicero</Claim>
      <UserForm profile={profile} setProfile={setProfile} />
    </Main>
  )
}

const Main = styled.main`
  background: #fff;
  padding: 20px;
  height: 100%;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Claim = styled.h2`
  text-align: center;
  font-size: 1rem;
  line-height: 1.6rem;
`
