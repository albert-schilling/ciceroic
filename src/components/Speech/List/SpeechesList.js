import React, { useState, useEffect } from 'react'
import styled from 'styled-components/macro'
import SpeechCard from '../Card/SpeechCard'
import Slider from '../../Slider/Slider'
import Spinner from '../../Spinner/Spinner'
import { getSpeeches } from '../../../services/speechServices'

export default function SpeechesList({
  profile = {},
  speeches = {},
  setSpeeches = () => {},
  setSpeech = () => {},
  activePage = '',
  setActivePage = () => {},
  modal = '',
  setModal = () => {},
  setSpeakerId = () => {},
}) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getSpeeches().then(res => {
      setLoading(false)
      setSpeeches(res)
    })
  }, [setSpeeches])

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          {speeches?.length === 0 ? (
            <p style={{ padding: '20px' }}>
              There are no speeches uploaded, yet. Be the first to upload a
              speech!
              <br />
              Click the button in the bottom left corner to upload a speech.
            </p>
          ) : (
            <Section
              className={
                activePage.length > 0
                  ? 'hidden'
                  : modal.length > 0
                  ? 'blur'
                  : ''
              }
            >
              <Slider
                title={'Evaluation required'}
                speeches={[...speeches].sort((a, b) => {
                  if (
                    a.evaluations === undefined ||
                    b.evaluations === undefined
                  ) {
                    return a
                  } else {
                    return a.evaluations.length > b.evaluations.length
                  }
                })}
                setSpeech={setSpeech}
                setActivePage={setActivePage}
                setModal={setModal}
              />
              <Slider
                title={'Lecture'}
                speeches={speeches.filter(
                  speech => speech.category === 'lecture'
                )}
                setSpeech={setSpeech}
                setActivePage={setActivePage}
                setModal={setModal}
              />
              <Slider
                title={'Comedy'}
                speeches={speeches.filter(
                  speech => speech.category === 'comedy'
                )}
                setSpeech={setSpeech}
                setActivePage={setActivePage}
                setModal={setModal}
              />
              {speeches.filter(speech => speech.category === 'pitch').length >
                0 && (
                <Slider
                  title={'Pitch'}
                  speeches={speeches.filter(
                    speech => speech.category === 'pitch'
                  )}
                  setSpeech={setSpeech}
                  setActivePage={setActivePage}
                  setModal={setModal}
                />
              )}
              {/* <SpeechesListContainer>
                {speeches.map(speech => {
                  return (
                    <SpeechCard
                      key={speech._id}
                      profile={profile}
                      speech={speech}
                      setSpeech={setSpeech}
                      setActivePage={setActivePage}
                      speakerId={speech.userId}
                      setSpeakerId={setSpeakerId}
                      modal={modal}
                      setModal={setModal}
                    />
                  )
                })}
              </SpeechesListContainer> */}
            </Section>
          )}
        </>
      )}
    </>
  )
}

const Section = styled.section`
  display: grid;
  grid-gap: 8px;
  margin-bottom: 20px;
  height: 100%;
  width: 100%;
  max-width: 1200px;
  padding: 0 12px;
  &.blur {
    filter: blur(2px);
  }
  &.hidden {
    display: none;
  }
`

const SpeechesListContainer = styled.section`
  margin-bottom: 20px;
  display: grid;
  grid-gap: 8px;
  @media (min-width: 700px) {
    grid-template-columns: 1fr 1fr;
  }
`
