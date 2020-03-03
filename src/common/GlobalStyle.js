import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  :root {
    font-size: 20px;
    font-family: sans-serif, Arial, Helvetica;
    --primary-bg-color: navy;
    --secondary-bg-color: darkred;
    --primary-font-color: #111;
    --secondary-font-color: #888;
    --inverse-primary-font-color: #fff;
    color: var(--primary-font-color);
    line-height: 100%;
  }
  body {
    margin: 0;
    width: 100vw;
    height: 100vh;
    background-color: #eee;
  }
`

export default GlobalStyle
