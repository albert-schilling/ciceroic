import React, { useEffect } from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import history from './common/history'
import styled from 'styled-components/macro'
import GlobalStyle from './common/GlobalStyle'
import Footer from './components/Footer'
import Header from './components/Header'
import Speech from './components/Speech/Speech'
import SpeechesList from './components/Speech/SpeechesList'
import useSpeech from './hooks/useSpeech'
import { getSpeeches } from './services/speechServices'
import AuthProvider from './components/Auth/AuthContext'
import UserForm from './components/UserForm/UserForm'
import HomePage from './components/Pages/HomePage'

function App() {
  const { speeches, setSpeeches, speech, setSpeech } = useSpeech({})
  const speechBasePath = '/videos/'

  useEffect(() => {
    getSpeeches().then(res => setSpeeches(res))
  }, [setSpeeches])
  return (
    <AppBodyStyled>
      <GlobalStyle />
      <Router history={history}>
        <AuthProvider>
          <Header />
          <Switch>
            <Route exact path="/">
              <HomePage
                speeches={speeches}
                setSpeech={setSpeech}
                speechBasePath={speechBasePath}
              />
              {/* {speeches === undefined ? (
                <p style={{ padding: '20px' }}>
                  Sorry, we cannot connect to the server. Please, try again
                  later.
                </p>
              ) : (
                <SpeechesList
                  speeches={speeches}
                  setSpeech={setSpeech}
                  speechBasePath={speechBasePath}
                />
              )} */}
            </Route>
            <Route exact path="/signup">
              <UserForm></UserForm>
            </Route>
            <Route exact path="/speech/:id">
              <Speech
                speech={speech}
                setSpeech={setSpeech}
                speechBasePath={speechBasePath}
              />
            </Route>
          </Switch>
        </AuthProvider>
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
