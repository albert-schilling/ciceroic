import React, { useEffect } from 'react'
import { Route, Router, Switch } from 'react-router-dom'
import styled from 'styled-components/macro'
import GlobalStyle from './common/GlobalStyle'
import history from './common/history'
import AuthProvider, { AuthConsumer } from './components/Auth/AuthContext'
import Footer from './components/Footer/Footer'
import Header from './components/Header'
import Speech from './components/Speech/Speech'
import SpeechesList from './components/Speech/SpeechesList'
import SignUp from './components/SignUp/SignUp'
import useSpeech from './hooks/useSpeech'
import { getSpeeches } from './services/speechServices'
import useProfile from './hooks/useProfile'
import LandingPage from './components/LandingPage/LandingPage'

function App() {
  const { speeches, setSpeeches, speech, setSpeech } = useSpeech({})
  const speechBasePath = '/videos/'
  const {
    profile,
    setProfile,
    profileRetrieved,
    setProfileRetrieved,
  } = useProfile()

  useEffect(() => {
    getSpeeches().then(res => setSpeeches(res))
  }, [setSpeeches, profile, setProfile])
  return (
    <AppBodyStyled>
      <GlobalStyle />
      <Router history={history}>
        <AuthProvider
          profile={profile}
          setProfile={setProfile}
          profileRetrieved={profileRetrieved}
          setProfileRetrieved={setProfileRetrieved}
        >
          <AuthConsumer>
            {({ user }) => (
              <>
                <Header />
                <Switch>
                  <Route exact path="/">
                    {user && user.id ? (
                      speeches === undefined ? (
                        <p style={{ padding: '20px' }}>
                          Sorry, we cannot connect to the server. Please, try
                          again later.
                        </p>
                      ) : (
                        <SpeechesList
                          speeches={speeches}
                          setSpeech={setSpeech}
                          speechBasePath={speechBasePath}
                        />
                      )
                    ) : (
                      <LandingPage profile={profile} setProfile={setProfile} />
                    )}
                  </Route>
                  <Route exact path="/signup">
                    <SignUp
                      history={history}
                      profile={profile}
                      setProfile={setProfile}
                    />
                  </Route>
                  <Route exact path="/speech/:id">
                    {user && user.id ? (
                      speeches === undefined ? (
                        <p style={{ padding: '20px' }}>
                          Sorry, we cannot connect to the server. Please, try
                          again later.
                        </p>
                      ) : (
                        <Speech
                          speech={speech}
                          setSpeech={setSpeech}
                          speechBasePath={speechBasePath}
                          profile={profile}
                          setProfile={setProfile}
                          user={user}
                        />
                      )
                    ) : (
                      <LandingPage profile={profile} setProfile={setProfile} />
                    )}
                  </Route>
                </Switch>
                <Footer />
              </>
            )}
          </AuthConsumer>
        </AuthProvider>
      </Router>
    </AppBodyStyled>
  )
}

export default App

const AppBodyStyled = styled.div`
  display: grid;
  grid-template: 60px auto max-content / 1fr;
  width: 100vw;
  height: 100vh;
`
