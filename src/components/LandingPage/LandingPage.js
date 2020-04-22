import React from 'react'
import styled from 'styled-components/macro'
import SignInForm from '../SignInForm/SignInForm'
import Footer from '../Footer/Footer'

export default function LandingPage({ profile, setProfile }) {
  return (
    <>
      <Main>
        <LandingPageStyled>
          <Claim>Become a great speaker like Cicero</Claim>
          <SignInForm profile={profile} setProfile={setProfile} />
        </LandingPageStyled>

        <Footer />
      </Main>
    </>
  )
}

const Main = styled.main`
  overflow-y: scroll;
`

const LandingPageStyled = styled.section`
  display: grid;
  justify-items: center;
  align-content: center;
  height: auto;
  min-height: calc(100vh - 60px);
  padding: 20px;
  background: #fff;
`

const Claim = styled.h2`
  padding: 0;
  text-align: center;
  font-size: 1.2rem;
  line-height: 1.6rem;
`
