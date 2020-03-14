import React, { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import styled from 'styled-components/macro'
import { evaluationDimensions } from '../../data/evaluationDimensions'
import useForm from '../../hooks/useForm'
import useSpeech from '../../hooks/useSpeech'
import { getSpeech } from '../../services/speechServices'
import Tab from '../Tab/Tab'
import SpeechEvaluation from './SpeechEvaluation'
import SpeechEvaluationForm from './SpeechEvaluationForm'
import SpeechStatistics from './SpeechStatistics'
import UserMessage from '../UserMessage/UserMessage'

export default function Speech({
  speechBasePath,
  speech,
  setSpeech,
  profile,
  setProfile,
  user,
}) {
  let { id } = useParams()

  // const inputFirstNameRef = useRef(null)
  // const inputLastNameRef = useRef(null)

  const {
    evaluation,
    setEvaluation,
    message,
    submitEvaluation,
    handleClickOnUserMessage,
    searchEvaluator,
    returnEvaluationByUser,
  } = useForm({
    profile,
    setProfile,
    evaluationDimensions,
    // refs: [inputFirstNameRef, inputLastNameRef],
    speech,
    setSpeech,
    id,
  })
  const [activeTab, setActiveTab] = useState('')

  const { editMode, setEditMode } = useSpeech()

  useEffect(() => {
    getSpeech(id).then(res => setSpeech(res))
    setEditMode(false)
  }, [setSpeech, id])

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

      <TabContainerStyled>
        <Tab
          handleClick={handleClick}
          activeTab={activeTab}
          active={true}
          title="Feedback"
        >
          {user && searchEvaluator(user.id) && !editMode ? (
            <SpeechEvaluation
              speech={speech}
              evaluation={evaluation}
              setEvaluation={setEvaluation}
              returnEvaluationByUser={returnEvaluationByUser}
              user={user}
              editMode={editMode}
              setEditMode={setEditMode}
            />
          ) : (
            // <p>Speech evaluation should go here</p>
            <SpeechEvaluationForm
              evaluation={evaluation}
              setEvaluation={setEvaluation}
              submitEvaluation={submitEvaluation}
              // inputFirstNameRef={inputFirstNameRef}
              // inputLastNameRef={inputLastNameRef}
              // message={message}
              handleClickOnUserMessage={handleClickOnUserMessage}
              profile={profile}
              editMode={editMode}
              setEditMode={setEditMode}
            />
          )}
        </Tab>
        <Tab handleClick={handleClick} activeTab={activeTab} title="Statistics">
          <SpeechStatistics speech={speech} />
        </Tab>
      </TabContainerStyled>
      {message.visible === true && (
        <UserMessage message={message} handleClick={handleClickOnUserMessage} />
      )}
    </Main>
  )

  function handleClick(ref) {
    setActiveTab(ref)
  }
}

const Main = styled.main`
  background: #fff;
  padding: 20px;
  height: 100%;
  overflow-y: scroll;
  @media (min-width: 700px) {
    display: grid;
    grid-template-areas: 'backLink backLink' 'video information' 'tab tab';
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

const TabContainerStyled = styled.section`
  grid-area: tab;
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
`

const SpeechEvaluationSubmit = styled.button`
  margin: 16px 0 40px 0;
  align-self: center;
  width: max-content;
  border: none;
  padding: 8px;
  background: var(--primary-bg-color);
  text-align: center;
  font-size: 1rem;
  color: var(--inverse-primary-font-color);
  text-decoration: none;
  cursor: pointer;
`
