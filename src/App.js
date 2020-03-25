import React, { useEffect, useState } from 'react'
import { Route, Router, Switch } from 'react-router-dom'
import styled from 'styled-components/macro'
import GlobalStyle from './common/GlobalStyle'
import history from './common/history'
import AuthProvider, { AuthConsumer } from './components/Auth/AuthContext'
import Footer from './components/Footer/Footer'
import Header from './components/Header'
import LandingPage from './components/LandingPage/LandingPage'
import Profile from './components/Profile/Profile'
import Settings from './components/Settings/Settings'
import SignUp from './components/SignUp/SignUp'
import Speech from './components/Speech/Speech'
import SpeechesList from './components/Speech/SpeechesList'
import { emptyProfile } from './data/emptyProfile'
import useSpeech from './hooks/useSpeech'
import { getSpeeches } from './services/speechServices'

function App() {
  const { speeches, setSpeeches, speech, setSpeech } = useSpeech({})
  const speechBasePath = '/videos/'
  const [profile, setProfile] = useState(emptyProfile)

  useEffect(() => {
    getSpeeches().then(res => setSpeeches(res))
  }, [setSpeeches, profile, setProfile])

  return (
    <AppBodyStyled>
      <GlobalStyle />
      <Router history={history}>
        <AuthProvider setProfile={setProfile}>
          <AuthConsumer>
            {({ user, logOut }) => (
              <>
                <Header />
                <Switch>
                  <Route exact path="/">
                    {user && user._id ? (
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
                    <SignUp profile={profile} setProfile={setProfile} />
                  </Route>
                  <Route exact path="/speech/:id">
                    {user && user._id ? (
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
                  <Route exact path="/profile/:id">
                    <Profile />
                  </Route>
                  <Route exact path="/settings/:id">
                    <Settings
                      profile={profile}
                      setProfile={setProfile}
                      logOut={logOut}
                    />
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
