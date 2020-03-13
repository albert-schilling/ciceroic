import React from 'react'
import styled from 'styled-components/macro'

export default function UserStatus({ user, logOut }) {
  return (
    <UserStatusInfo>
      <p>{user.email}</p>
      <button onClick={event => logOut(event)}>Log out</button>
    </UserStatusInfo>
  )
}

const UserStatusInfo = styled.section`
  display: flex;
  grid-gap: 8px;
  align-items: center;
  > p {
    font-size: 0.8rem;
  }
  h4 {
    font-weight: 500;
    text-align: center;
  }
  button {
    font-size: 0.6rem;
    padding: 4px;
  }
`
