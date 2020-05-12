import React, { useState, useEffect } from 'react'
import styled from 'styled-components/macro'
import Slider from '../../Slider/Slider'
import Spinner from '../../Spinner/Spinner'
import { getSpeeches } from '../../../services/speechServices'
import useSpeech from '../../../hooks/useSpeech'

export default function SpeechesList({
  speeches = {},
  setSpeeches = () => {},
  setSpeech = () => {},
  activePage = '',
  setActivePage = () => {},
  modal = '',
  setModal = () => {},
}) {
  const [loading, setLoading] = useState(true)
  const {
    shortenArray,
    sortAccordingToDate,
    sortAccordingToEvaluations,
    returnCategories,
    capitalizeString,
  } = useSpeech()

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
                speeches={shortenArray(sortAccordingToEvaluations(speeches), 5)}
                setSpeech={setSpeech}
                setActivePage={setActivePage}
                setModal={setModal}
              />
              <Slider
                title={'Recent Speeches'}
                speeches={shortenArray(sortAccordingToDate(speeches), 5)}
                setSpeech={setSpeech}
                setActivePage={setActivePage}
                setModal={setModal}
              />
              {returnCategories(speeches).map(category => {
                return (
                  <Slider
                    key={`slider-${category}`}
                    title={category && capitalizeString(category)}
                    speeches={speeches.filter(
                      speech => speech.category === category
                    )}
                    setSpeech={setSpeech}
                    setActivePage={setActivePage}
                    setModal={setModal}
                  />
                )
              })}
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
    visibility: hidden;
    height: 0;
    margin: 0;
  }
`
