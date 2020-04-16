import React, { useEffect, useState } from 'react'
import { Route, Router, Switch } from 'react-router-dom'
import styled from 'styled-components/macro'
import GlobalStyle from './common/GlobalStyle'
import history from './common/history'
import AuthProvider, { AuthConsumer } from './components/Auth/AuthContext'
import Navigation from './components/Navigation/Navigation'
import Header from './components/Header'
import LandingPage from './components/LandingPage/LandingPage'
import Profile from './components/Profile/Profile'
import Settings from './components/Settings/Settings'
import SignUpPage from './components/SignUp/SignUpPage'
import Speech from './components/Speech/Speech'
import SpeechesList from './components/Speech/SpeechesList'
import { emptyProfile } from './data/emptyProfile'
import useSpeech from './hooks/useSpeech'
import { getSpeeches } from './services/speechServices'
import UploadForm from './components/UploadForm/UploadForm'
import Footer from './components/Footer/Footer'
import Spinner from './components/Spinner/Spinner'

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
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getSpeeches().then(res => {
      setLoading(false)
      setSpeeches(res)
    })
  }, [setSpeeches])

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
                    {user?._id ? (
                      <Main>
                        {loading ? (
                          <Spinner />
                        ) : (
                          <>
                            {speeches?.length === 0 ? (
                              <p style={{ padding: '20px' }}>
                                There are no speeches uploaded, yet. Be the
                                first to upload a speech!
                                <br />
                                Click the button in the bottom left corner to
                                upload a speech.
                              </p>
                            ) : (
                              <>
                                <SpeechesList
                                  profile={profile}
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
                              </>
                            )}
                          </>
                        )}

                        <UploadForm
                          history={history}
                          user={user}
                          profile={profile}
                          setSpeech={setSpeech}
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
                          setSpeech={setSpeech}
                          speakerId={speech.userId}
                          setSpeakerId={setSpeakerId}
                          showProfile={showProfile}
                          setShowProfile={setShowProfile}
                        />
                        <Profile
                          profile={profile}
                          activePage={activePage}
                          setActivePage={setActivePage}
                          setSpeech={setSpeech}
                          speakerId={speakerId}
                          setSpeakerId={setSpeakerId}
                          showProfile={showProfile}
                          setShowProfile={setShowProfile}
                        />
                        <Footer />
                      </Main>
                    ) : (
                      <LandingPage profile={profile} setProfile={setProfile} />
                    )}
                  </Route>
                  <Route exact path="/signup">
                    <SignUpPage profile={profile} setProfile={setProfile} />
                  </Route>
                </Switch>
                <Navigation
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
  grid-template: 60px auto / 1fr;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`

const Main = styled.main`
  display: grid;
  grid-template: auto auto / 1fr;
  justify-items: center;
  overflow-y: scroll;
`
