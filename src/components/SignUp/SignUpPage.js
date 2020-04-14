import React from 'react'
import styled from 'styled-components/macro'
import SignUpForm from './SignUpForm'
import { useHistory } from 'react-router-dom'
import Footer from '../Footer/Footer'

export default function SignUpPage({
  profile,
  setProfile,
  // history
}) {
  const history = useHistory()

  return (
    <Main>
      <SignUpPageStyled>
        <SignUpForm
          history={history}
          profile={profile}
          setProfile={setProfile}
        />
      </SignUpPageStyled>
      <Footer />
    </Main>
  )
}

const Main = styled.main`
  overflow-y: scroll;
`

const SignUpPageStyled = styled.section`
  display: grid;
  justify-items: center;
  align-content: center;
  height: auto;
  min-height: calc(100vh - 60px);
  padding: 20px;
  background: #fff;
`
