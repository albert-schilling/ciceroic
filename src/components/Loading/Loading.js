import React from 'react'
import styled from 'styled-components/macro'
import UserForm from '../UserForm/UserForm'

export default function Loading() {
  return (
    <Main>
      <h2>Ciceroic</h2>
      <h4>Become a great speaker like Cicero</h4>
      <UserForm />
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
  > h2 {
    margin: 0;
  }
`
