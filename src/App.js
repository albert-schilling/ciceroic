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
import UploadForm from './components/UploadForm/UploadForm'

function App() {
  const { speeches, setSpeeches, speech, setSpeech } = useSpeech({})
  const [profile, setProfile] = useState(emptyProfile)
  const [newSpeech, setNewSpeech] = useState({
    _id: '',
    filename: '',
    title: '',
    speaker: ``,
    description: '',
    category: 'lecture',
    date: '',
    duration: '',
    userId: ``,
    fileUrl: '',
    status: '',
    uploadStatus: '',
  })

  const [activePage, setActivePage] = useState('')
  const [speakerId, setSpeakerId] = useState('')
  const [showProfile, setShowProfile] = useState(false)

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
                        <Main>
                          <SpeechesList
                            speeches={speeches}
                            setSpeech={setSpeech}
                            activePage={activePage}
                            setActivePage={setActivePage}
                            setSpeakerId={setSpeakerId}
                            setShowProfile={setShowProfile}
                            showProfile={showProfile}
                          />
                          <Speech
                            speech={speech}
                            setSpeech={setSpeech}
                            profile={profile}
                            setProfile={setProfile}
                            user={user}
                            activePage={activePage}
                            setActivePage={setActivePage}
                            setSpeakerId={setSpeakerId}
                            setShowProfile={setShowProfile}
                            showProfile={showProfile}
                          />
                          <UploadForm
                            history={history}
                            user={user}
                            profile={profile}
                            newSpeech={newSpeech}
                            setNewSpeech={setNewSpeech}
                            activePage={activePage}
                            setActivePage={setActivePage}
                            setSpeeches={setSpeeches}
                          />
                          <Settings
                            profile={profile}
                            setProfile={setProfile}
                            logOut={logOut}
                            activePage={activePage}
                            setActivePage={setActivePage}
                          />
                          <Profile
                            speakerId={speakerId}
                            activePage={activePage}
                            showProfile={showProfile}
                            setShowProfile={setShowProfile}
                          />
                        </Main>
                      )
                    ) : (
                      <LandingPage profile={profile} setProfile={setProfile} />
                    )}
                  </Route>
                  <Route exact path="/signup">
                    <SignUp profile={profile} setProfile={setProfile} />
                  </Route>
                </Switch>
                <Footer
                  history={history}
                  user={user}
                  activePage={activePage}
                  setActivePage={setActivePage}
                />
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

const Main = styled.main`
  position: relative;
`
