import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  :root {
    --primary-bg-color: #003;
    --secondary-bg-color: #a00;
    --light-grey: #eee;
    --primary-font-color: #111;
    --secondary-font-color: #888;
    --inverse-primary-font-color: #fff;
    --highlight-color: #003;
    --secondary-highlight-color: #a00;

    font-size: 20px;
    font-family: sans-serif, Arial, Helvetica;
    color: var(--primary-font-color);
    line-height: 100%;
  }
  body {
    margin: 0;
    width: 100vw;
    height: 100vh;
    background-color: #eee;
    font-weight: 300;
  }
`

export default GlobalStyle
