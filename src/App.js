import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import styled from 'styled-components/macro'
import GlobalStyle from './common/GlobalStyle'
import Footer from './components/Footer'
import Header from './components/Header'
import SpeechesList from './components/Speech/SpeechesList'
import Speech from './components/Speech/Speech'
import { getSpeeches } from './services/speechServices'
import useSpeech from './hooks/useSpeech'

function App() {
  const { speeches, setSpeeches, speech, setSpeech } = useSpeech({})
  const speechBasePath = '/videos/'

  useEffect(() => {
    getSpeeches().then(res => setSpeeches(res))
  }, [setSpeeches])
  // console.log('speeches:', speeches)
  // console.log('speech:', speech)
  return (
    <AppBodyStyled>
      <GlobalStyle />
      <Header />
      <Router>
        <Switch>
          <Route exact path="/">
            {speeches === undefined ? (
              <p style={{ padding: '20px' }}>
                {console.log('(speeches', speeches)}
                Sorry, we cannot connect to the server. Please, try again later.
              </p>
            ) : (
              <SpeechesList
                speeches={speeches}
                setSpeech={setSpeech}
                speechBasePath={speechBasePath}
              />
            )}
          </Route>
          <Route exact path="/speech/:id">
            <Speech
              speech={speech}
              setSpeech={setSpeech}
              speechBasePath={speechBasePath}
            />
          </Route>
        </Switch>
      </Router>
      <Footer />
    </AppBodyStyled>
  )
}

export default App

const AppBodyStyled = styled.div`
  display: grid;
  grid-template: 72px auto 60px / 1fr;
  width: 100vw;
  height: 100vh;
`
