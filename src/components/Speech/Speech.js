import React, { useEffect, useRef } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import styled from 'styled-components/macro'
import { evaluationDimensions } from '../../data/evaluationDimensions'
import { getSpeeches } from '../../services/speechServices'
import SpeechEvaluationForm from './SpeechEvaluationForm'
import useForm from '../../hooks/useForm'

export default function Speech({ speechBasePath, speech, setSpeech }) {
  let { id } = useParams()

  const inputFirstNameRef = useRef(null)
  const inputLastNameRef = useRef(null)

  const [
    evaluation,
    setEvaluation,
    message,
    setMessage,
    handleSubmit,
  ] = useForm(
    evaluationDimensions,
    [inputFirstNameRef, inputLastNameRef],
    speech,
    setSpeech,
    id
  )

  useEffect(() => {
    Object.entries(speech).length === 0 &&
      getSpeeches(id).then(res => {
        setSpeech(res)
      })
    inputFirstNameRef.current.focus()
  }, [speech, setSpeech, id])

  return (
    <Main>
      <NavLinkStyled exact to="/">
        <span>&#8612;</span>see all speeches
      </NavLinkStyled>
      {speech.filename === undefined ? (
        <p>Video loading</p>
      ) : (
        <VideoStyled role="img" controls>
          <source src={speechBasePath + speech.filename} type="video/mp4" />
        </VideoStyled>
      )}
      <SpeechInformation>
        <header>
          <SpeechTitle>{speech.title}</SpeechTitle>
        </header>
        <h3>{speech.speaker}</h3>
        <SpeechDescription>{speech.description}</SpeechDescription>
        <SpeechDetails>
          <small>{speech.category}</small>
          <small>{speech.duration} min</small>
          <small>{speech.date}</small>
        </SpeechDetails>
      </SpeechInformation>
      <SpeechEvaluationForm
        evaluation={evaluation}
        setEvaluation={setEvaluation}
        handleSubmit={handleSubmit}
        inputFirstNameRef={inputFirstNameRef}
        inputLastNameRef={inputLastNameRef}
        message={message}
        setMessage={setMessage}
      />
    </Main>
  )
}

const Main = styled.main`
  background: #fff;
  padding: 20px;
  height: 100%;
  overflow-y: scroll;
  @media (min-width: 700px) {
    display: grid;
    grid-template-areas: 'backLink backLink' 'video information' 'evaluation evaluation';
    grid-gap: 12px;
  }
`

const NavLinkStyled = styled(NavLink)`
  grid-area: backLink;
  width: fit-content;
  padding: 4px 4px 4px 4px;
  background: var(--light-grey);
  color: inherit;
  text-decoration: none;
  font-size: 0.6rem;
  span {
    padding-top: 4px;
    margin-right: 4px;
    color: var(--highlight-color);

    font-size: 1rem;
    font-weight: 900;
  }
`
const SpeechTitle = styled.h2`
  font-size: 1.2rem;
  line-height: 1.6rem;
`

const SpeechInformation = styled.section`
  grid-area: information;
  h3 {
    font-size: 1rem;
  }
`

const VideoStyled = styled.video`
  width: 100%;
  height: auto;
  margin-top: 12px;
  grid-area: video;
`

const SpeechDescription = styled.p`
  line-height: 1.4rem;
`

const SpeechDetails = styled.p`
  display: flex;
  justify-content: space-between;
  grid-gap: 4px;
  color: var(--secondary-font-color);
  margin-bottom: 0;
`
