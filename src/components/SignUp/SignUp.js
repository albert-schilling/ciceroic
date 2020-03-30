import React from 'react'
import styled from 'styled-components/macro'
import SignUpForm from './SignUpForm'
import { useHistory } from 'react-router-dom'

export default function SignUp({
  profile,
  setProfile,
  // history
}) {
  const history = useHistory()

  return (
    <Main>
      <SignUpForm history={history} profile={profile} setProfile={setProfile} />
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
