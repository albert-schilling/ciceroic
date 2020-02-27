import React from 'react'
import { createGlobalStyle } from 'styled-components'

export default function GlobalStyle() {
  return (
    <>
      <NewGlobalStyle />
    </>
  )
}

const NewGlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  :root {
    font-size: 20px;
    font-family: sans-serif, Arial, Helvetica;
  }
  body {
    margin: 0;
    width: 100vw;
    height: 100vh;
  }
`
