import React, { useEffect, useState } from 'react'
import styled from 'styled-components/macro'
import { getUser } from '../../services/userServices'
import IconClose from '../Inputs/Icons/IconClose'
import SpeechCard from '../Speech/SpeechCard'
import { getSpeechesByUser } from '../../services/speechServices'

export default function Profile({
  speakerId = '',
  setSpeakerId = () => {},
  showProfile = false,
  setShowProfile = () => {},
  profile = {},
  activePage = '',
  setActivePage = () => {},
  setSpeech,
}) {
  const [lightbox, setLightbox] = useState(false)
  const [loading, setLoading] = useState(true)
  const [foreignProfile, setForeignProfile] = useState('')
  const [speechesByUser, setSpeechesByUser] = useState([])

  useEffect(() => {
    speakerId.length > 0 &&
      getUser({ id: speakerId })
        .then(res => setForeignProfile(res))
        .then(() => setLoading(false))
        .catch(error => console.log('Error retrieving user:', error))
    speakerId.length > 0 &&
      getSpeechesByUser({ id: speakerId }).then(res => setSpeechesByUser(res))
  }, [speakerId])
  return (
    <Section className={showProfile && 'visible'}>
      <Wrapper>
        <IconClose position="topright" callback={() => setShowProfile(false)} />

        {loading ? (
          <Spinner>
            <SpinnerBalls />
          </Spinner>
        ) : (
          <>
            <ProfileSection>
              {lightbox ? (
                <Lightbox>
                  <LightboxClose>
                    <IconClose
                      color="#fff"
                      callback={() => setLightbox(false)}
                    />
                  </LightboxClose>
                  <LightboxImage>
                    <Image
                      src={
                        foreignProfile.portrait &&
                        foreignProfile.portrait.length > 0
                          ? foreignProfile.portrait
                          : '/images/default_protrait_cicero_001.jpg'
                      }
                      alt={
                        foreignProfile.portrait &&
                        foreignProfile.portrait.length > 0
                          ? `Portrait by ${foreignProfile.firstName} ${foreignProfile.lastName}`
                          : 'Default image of a user foreignProfile on Ciceroic, showing Marcus Tullius Cicero, the great rhetorician from ancient Rome.'
                      }
                    />
                  </LightboxImage>
                </Lightbox>
              ) : (
                <Portrait
                  onClick={() => setLightbox(true)}
                  style={{
                    backgroundImage: `url('${
                      foreignProfile.portrait &&
                      foreignProfile.portrait.length > 0
                        ? foreignProfile.portrait
                        : '/images/default_protrait_cicero_001.jpg'
                    }')`,
                  }}
                />
              )}
              <AboutSection>
                <Name>
                  {foreignProfile.firstName} {foreignProfile.lastName}
                </Name>
                <About>{foreignProfile.about}</About>
              </AboutSection>
            </ProfileSection>
            {speechesByUser.length > 0 ? (
              <>
                {speechesByUser.map(speech => {
                  return (
                    <>
                      <p>Speeches by {foreignProfile.firstName}:</p>
                      <SpeechCard
                        key={speech._id}
                        profile={profile}
                        speech={speech}
                        setSpeech={setSpeech}
                        setActivePage={setActivePage}
                        speakerId={speech.userId}
                        setSpeakerId={setSpeakerId}
                        showProfile={showProfile}
                        setShowProfile={setShowProfile}
                      />
                    </>
                  )
                })}
              </>
            ) : (
              <p>No speeches yet.</p>
            )}
          </>
        )}
      </Wrapper>
    </Section>
  )
}

const Section = styled.section`
  position: fixed;
  top: 0;
  display: none;
  align-content: flex-start;
  grid-gap: 20px;
  margin: 0;
  padding: 80px 20px 20px 20px;
  overflow-y: scroll;
  height: 100vh;
  width: 100%;
  &.visible {
    display: grid;
  }
`

const Wrapper = styled.div`
  position: relative;
  display: grid;
  justify-self: center;
  align-content: flex-start;
  height: 100%;
  width: 100%;
  border: 1px solid var(--highlight-color);
  padding: 20px;
  background: #fff;
  overflow-y: scroll;
`

const ProfileSection = styled.section`
  display: grid;
  @media (min-width: 700px) {
    display: grid;
    grid-template: auto / 1fr 1fr;
    grid-gap: 40px;
  }
`

const Portrait = styled.section`
  background-size: cover;
  justify-self: center;
  margin: 0 0 20px 0;
  border: 2px solid var(--light-grey);
  border-radius: 50%;
  width: 150px;
  height: 150px;
  overflow: hidden;
  cursor: pointer;
  @media (min-width: 700px) {
    width: 250px;
    height: 250px;
  }
`
const AboutSection = styled.section`
  @media (min-width: 700px) {
    display: grid;
    grid-gap: 12px;
    align-content: center;
  }
`

const Name = styled.h3`
  font-size: 1rem;
  font-weight: 500;
`

const About = styled.p`
  margin: 0;
  line-height: 1.4rem;
`

const Lightbox = styled.section`
  position: fixed;
  display: grid;
  grid-template: auto max-content / 1fr;
  width: 100%;
  height: 100%;
  z-index: 2;
  left: 0;
  top: 0;
`
const LightboxImage = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: var(--primary-font-color);
  overflow: hidden;
  > img {
    width: auto;
    height: 100%;
  }
`
const Image = styled.img`
  text-align: center;
  align-self: center;
`

const LightboxClose = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 8px;
  right: 8px;
  width: 40px;
  height: 40px;
`

const Spinner = styled.section`
  position: absolute;
  left: calc(50% - 20px);
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 10px;
  border-radius: 4px;
  height: 200px;
  margin: 20px 0;
`

const SpinnerBalls = styled.div`
  display: inline-block;
  position: relative;
  width: 32px;
  height: 32px;
  clear: both;
  border-radius: 50%;
  background-color: #000;
  width: 18px;
  height: 18px;
  :before,
  :after {
    position: absolute;
    border-radius: 50%;
    background-color: #000;
    width: 18px;
    height: 18px;
    transform-origin: center center;
    display: inline-block;
  }
  position: relative;
  background-color: rgba(#000, 1);
  opacity: 1;
  -webkit-animation: spScaleAlpha 1s infinite linear;
  animation: spScaleAlpha 1s infinite linear;
  :before,
  :after {
    content: '';
    opacity: 0.25;
  }
  :before {
    left: 30px;
    /* left: 30px; */
    /* top: 0px; */
    -webkit-animation: spScaleAlphaBefore 1s infinite linear;
    animation: spScaleAlphaBefore 1s infinite linear;
  }
  :after {
    right: 30px;

    /* left: -30px; */
    /* top: -23px; */
    -webkit-animation: spScaleAlphaAfter 1s infinite linear;
    animation: spScaleAlphaAfter 1s infinite linear;
  }
  @-webkit-keyframes spScaleAlpha {
    0% {
      opacity: 1;
    }
    33% {
      opacity: 0.25;
    }
    66% {
      opacity: 0.25;
    }
    100% {
      opacity: 1;
    }
  }
  @keyframes spScaleAlpha {
    0% {
      opacity: 1;
    }
    33% {
      opacity: 0.25;
    }
    66% {
      opacity: 0.25;
    }
    100% {
      opacity: 1;
    }
  }
  @-webkit-keyframes spScaleAlphaBefore {
    0% {
      opacity: 0.25;
    }
    33% {
      opacity: 1;
    }
    66% {
      opacity: 0.25;
    }
  }
  @keyframes spScaleAlphaBefore {
    0% {
      opacity: 0.25;
    }
    33% {
      opacity: 1;
    }
    66% {
      opacity: 0.25;
    }
  }
  @-webkit-keyframes spScaleAlphaAfter {
    33% {
      opacity: 0.25;
    }
    66% {
      opacity: 1;
    }
    100% {
      opacity: 0.25;
    }
  }
  @keyframes spScaleAlphaAfter {
    33% {
      opacity: 0.25;
    }
    66% {
      opacity: 1;
    }
    100% {
      opacity: 0.25;
    }
  }
`
