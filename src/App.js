import React, { useState } from 'react'
import { Route, Router, Switch } from 'react-router-dom'
import styled from 'styled-components/macro'
import GlobalStyle from './common/GlobalStyle'
import history from './common/history'
import AuthProvider, { AuthConsumer } from './components/Auth/AuthContext'
import Navigation from './components/Navigation/Navigation'
import Header from './components/Header/Header'
import LandingPage from './components/LandingPage/LandingPage'
import Profile from './components/Profile/Profile'
import Settings from './components/Settings/Settings'
import SignUpPage from './components/SignUp/SignUpPage'
import Speech from './components/Speech/Speech'
import SpeechesList from './components/Speech/List/SpeechesList'
import { initialProfile } from './data/initialProfile'
import useSpeech from './hooks/useSpeech'
import UploadForm from './components/UploadForm/UploadForm'
import Footer from './components/Footer/Footer'
import Spinner from './components/Spinner/Spinner'

function App() {
  const { speeches, setSpeeches, speech, setSpeech } = useSpeech({})
  const [profile, setProfile] = useState(initialProfile)
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
  const [modal, setModal] = useState('')
  const [speakerId, setSpeakerId] = useState('')

  return (
    <AppBodyStyled>
      <GlobalStyle />
      <Router history={history}>
        <AuthProvider setProfile={setProfile}>
          <AuthConsumer>
            {({ user, logOut }) => (
              <>
                <Header />
                {user.status === 'unclear' ? (
                  <Spinner />
                ) : (
                  <>
                    <Switch>
                      <Route exact path="/">
                        {user?._id ? (
                          <Main>
                            <>
                              <SpeechesList
                                profile={profile}
                                speeches={speeches}
                                setSpeeches={setSpeeches}
                                setSpeech={setSpeech}
                                activePage={activePage}
                                setActivePage={setActivePage}
                                setSpeakerId={setSpeakerId}
                                modal={modal}
                                setModal={setModal}
                              />
                              {console.log('activePage:', activePage)}
                              {activePage === '/speech' && (
                                <Speech
                                  speech={speech}
                                  setSpeech={setSpeech}
                                  profile={profile}
                                  setProfile={setProfile}
                                  user={user}
                                  activePage={activePage}
                                  setActivePage={setActivePage}
                                  setSpeakerId={setSpeakerId}
                                  modal={modal}
                                  setModal={setModal}
                                />
                              )}
                            </>

                            <UploadForm
                              history={history}
                              user={user}
                              profile={profile}
                              setSpeech={setSpeech}
                              newSpeech={newSpeech}
                              setNewSpeech={setNewSpeech}
                              modal={modal}
                              setModal={setModal}
                              setActivePage={setActivePage}
                              setSpeeches={setSpeeches}
                            />
                            <Settings
                              profile={profile}
                              setProfile={setProfile}
                              logOut={logOut}
                              modal={modal}
                              setModal={setModal}
                              setActivePage={setActivePage}
                              setSpeech={setSpeech}
                              speakerId={speech.userId}
                              setSpeakerId={setSpeakerId}
                            />
                            <Profile
                              profile={profile}
                              modal={modal}
                              setModal={setModal}
                              setActivePage={setActivePage}
                              setSpeech={setSpeech}
                              speakerId={speakerId}
                              setSpeakerId={setSpeakerId}
                              modal={modal}
                              setModal={setModal}
                            />
                            <Footer />
                          </Main>
                        ) : (
                          <LandingPage
                            profile={profile}
                            setProfile={setProfile}
                          />
                        )}
                      </Route>
                      <Route exact path="/signup">
                        <SignUpPage profile={profile} setProfile={setProfile} />
                      </Route>
                    </Switch>
                    <Navigation user={user} modal={modal} setModal={setModal} />
                  </>
                )}
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
