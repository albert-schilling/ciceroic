import React from 'react'
import styled from 'styled-components/macro'

export { Main }

function Main({ children }) {
  return <DefaultMain>{children}</DefaultMain>
}

const DefaultMain = styled.main`
  display: grid;
  height: 100%;
  padding: 20px;
  background: #fff;
  overflow-y: scroll;
  > *:last-child {
    padding-bottom: 100px;
  }
`
