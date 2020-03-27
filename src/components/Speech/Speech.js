import React, { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import styled from 'styled-components/macro'
import useForm from '../../hooks/useForm'
import { getSpeech } from '../../services/speechServices'
import Tab from '../Tab/Tab'
import UserMessage from '../UserMessage/UserMessage'
import CommunityEvaluations from './CommunityEvaluations'
import SpeechStatistics from './SpeechStatistics'
import UserEvaluation from './UserEvaluation'
import SpeechDescription from './SpeechDescription/SpeechDescription'

export default function Speech({
  speechBasePath,
  speech,
  setSpeech,
  profile,
  user,
  speechId,
  activePage = '',
  setActivePage = () => {},
}) {
  // let { id } = useParams()

  const {
    evaluation,
    setEvaluation,
    message,
    setMessage,
    handleClickOnUserMessage,
    searchEvaluator,
    getEvaluationByCurrentUser,
  } = useForm()

  const [activeTab, setActiveTab] = useState('')

  useEffect(() => {
    speech._id && getSpeechFromDB(speech._id)
  }, [speech._id])

  if (profile._id.length > 0) {
    return (
      <Section className={activePage === '/speech' && 'visible'}>
        <BackLink onClick={() => setActivePage('')}>
          <span>&#8612;</span>see all speeches
        </BackLink>
        {speech.filename === undefined ? (
          <p>Video not found.</p>
        ) : (
          <VideoStyled role="img" controls>
            <source src={speechBasePath + speech.filename} type="video/mp4" />
          </VideoStyled>
        )}
        <SpeechDescription
          title={speech.title}
          speaker={speech.speaker}
          description={speech.description}
          category={speech.category}
          duration={speech.duration}
          date={speech.date}
        />
        <TabContainerStyled>
          <Tab
            handleClick={handleClick}
            activeTab={activeTab}
            active={true}
            title="Feedback"
          >
            <UserEvaluation
              speech={speech}
              setSpeech={setSpeech}
              user={user}
              profile={profile}
              message={message}
              setMessage={setMessage}
            />
            <CommunityEvaluations
              user={user}
              profile={profile}
              speech={speech}
              setSpeech={setSpeech}
            />
          </Tab>
          <Tab
            handleClick={handleClick}
            activeTab={activeTab}
            title="Statistics"
          >
            <SpeechStatistics speech={speech} />
          </Tab>
        </TabContainerStyled>
        {message.visible === true && (
          <UserMessage
            message={message}
            handleClick={handleClickOnUserMessage}
          />
        )}
      </Section>
    )
  } else {
    return (
      <Section>
        <BackLink onClick={() => setActivePage('')}>
          <span>&#8612;</span>see all speeches
        </BackLink>
        <p>Waiting on user data.</p>
      </Section>
    )
  }

  function handleClick(ref) {
    setActiveTab(ref)
  }
  function getSpeechFromDB(id) {
    getSpeech(id)
      .then(res => {
        setSpeech(res)
        return res
      })
      .then(speech => {
        const foundEvaluator = searchEvaluator({ user, speech })
        if (foundEvaluator) {
          const foundEvaluation = getEvaluationByCurrentUser({ user, speech })
          Object.assign(evaluation, foundEvaluation)
          setEvaluation(evaluation)
        }
      })
  }
}

const Section = styled.section`
  position: fixed;
  top: 60px;
  display: none;
  flex-direction: column;
  padding: 20px;
  overflow-y: scroll;
  background: #fff;
  height: 100vh;
  width: 100%;
  > *:last-child {
    padding-bottom: 60px;
  }
  &.visible {
    display: flex;
  }
  @media (min-width: 700px) {
    display: grid;
    grid-template-areas: 'backLink backLink' 'video information' 'tab tab';
    grid-gap: 12px;
  }
`

const BackLink = styled.a`
  grid-area: backLink;
  width: fit-content;
  height: fit-content;
  padding: 4px 4px 4px 4px;
  background: var(--light-grey);
  color: inherit;
  text-decoration: none;
  font-size: 0.8rem;
  cursor: pointer;
  span {
    padding-top: 4px;
    margin-right: 4px;
    color: var(--highlight-color);

    font-size: 1rem;
    font-weight: 900;
  }
`

const VideoStyled = styled.video`
  width: 100%;
  height: auto;
  margin-top: 12px;
  grid-area: video;
`

const TabContainerStyled = styled.section`
  grid-area: tab;
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
`
