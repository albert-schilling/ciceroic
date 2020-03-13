import React from 'react'
import styled from 'styled-components/macro'
import SignUpForm from './SignUpForm'

export default function SignUp({ userData, setUserData }) {
  return (
    <Main>
      <SignUpForm userData={userData} setUserData={setUserData} />
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
  h2 {
    margin: 0;
  }
  h4 {
    text-align: center;
    line-height: 1.6rem;
  }
`