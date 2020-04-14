import React, { useEffect, useState } from 'react'
import styled from 'styled-components/macro'
import useForm from '../../hooks/useForm'
import { getSpeech } from '../../services/speechServices'
import Tab from '../Tab/Tab'
import UserMessage from '../UserMessage/UserMessage'
import CommunityEvaluations from './CommunityEvaluations'
import SpeechStatistics from './SpeechStatistics'
import UserEvaluation from './UserEvaluation'
import SpeechDescription from './SpeechDescription/SpeechDescription'
import useDate from '../../hooks/useDate'

export default function Speech({
  speech,
  setSpeech,
  profile,
  user,
  activePage = '',
  setActivePage = () => {},
  showProfile = false,
  setShowProfile = () => {},
  setSpeakerId = () => {},
}) {
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
  const { convertTimestampToDate } = useDate()

  useEffect(() => {
    console.log('useEffect in Speech called')
    console.log(evaluation)
    speech._id && getSpeechFromDB(speech._id)
  }, [speech._id])

  return (
    <>
      {speech._id ? (
        <Section
          className={
            activePage === '/speech'
              ? showProfile
                ? 'blur visible'
                : 'visible'
              : ''
          }
        >
          <BackLink onClick={() => setActivePage('')}>
            <span>&#8612;</span>see all speeches
          </BackLink>
          {speech.filename === undefined ? (
            <p>Video not found.</p>
          ) : (
            <VideoStyled role="img" controls>
              <source src={speech.fileUrl} type="video/mp4" />
            </VideoStyled>
          )}
          <SpeechDescription
            title={speech.title}
            profile={profile}
            speaker={speech.speaker}
            speakerId={speech.userId}
            setSpeakerId={setSpeakerId}
            setShowProfile={setShowProfile}
            description={speech.description}
            category={
              speech.category &&
              speech.category.charAt(0).toUpperCase() + speech.category.slice(1)
            }
            duration={speech.duration}
            date={speech.date && convertTimestampToDate(speech.date)}
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
                setSpeakerId={setSpeakerId}
                setShowProfile={setShowProfile}
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
      ) : (
        <></>
      )}
    </>
  )

  function handleClick(ref) {
    setActiveTab(ref)
  }
  function getSpeechFromDB(id) {
    getSpeech({ id })
      .then(res => {
        setSpeech(res)
        return res
      })
      .then(speech => {
        const foundEvaluator = searchEvaluator({ user, speech })
        if (foundEvaluator) {
          const foundEvaluation = getEvaluationByCurrentUser({ user, speech })
          // Object.assign(evaluation, foundEvaluation)
          setEvaluation(foundEvaluation)
        } else {
          setEvaluation({})
        }
      })
  }
}

const Section = styled.section`
  display: none;
  flex-direction: column;
  height: 100%;
  width: 100%;
  max-width: 1200px;
  padding: 20px;
  background: #fff;
  &.visible {
    display: flex;
  }
  &.blur {
    filter: blur(2px);
  }
  @media (min-width: 700px) {
    &.visible {
      display: grid;
      grid-template-areas: 'backLink backLink' 'video information' 'tab tab';
      grid-gap: 12px;
    }
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
