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
}) {
  let { id } = useParams()

  const {
    evaluation,
    setEvaluation,
    message,
    setMessage,
    handleClickOnUserMessage,
    searchEvaluator,
    returnEvaluationByUser,
  } = useForm()

  const [activeTab, setActiveTab] = useState('')

  useEffect(() => {
    getSpeech(id)
      .then(res => {
        setSpeech(res)
        return res
      })
      .then(speech => {
        const foundEvaluator = searchEvaluator({ user, speech })
        if (foundEvaluator) {
          const foundEvaluation = returnEvaluationByUser({ user, speech })
          Object.assign(evaluation, foundEvaluation)
          setEvaluation(evaluation)
        }
      })
  }, [])
  // }, [setSpeech, id, profile.id])
  //
  if (profile.id.length > 0) {
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
      </Main>
    )
  } else {
    return (
      <Main>
        <NavLinkStyled exact to="/">
          <span>&#8612;</span>see all speeches
        </NavLinkStyled>
        <p>Waiting on user data.</p>
      </Main>
    )
  }

  function handleClick(ref) {
    setActiveTab(ref)
  }
}

const Main = styled.main`
  margin-bottom: 20px;
  background: #fff;
  padding: 20px;
  height: 100%;
  overflow-y: scroll;
  > section:last-child {
    margin-bottom: 80px;
  }
  @media (min-width: 700px) {
    display: grid;
    grid-template-areas: 'backLink backLink' 'video information' 'tab tab';
    grid-gap: 12px;
  }
`

const NavLinkStyled = styled(NavLink)`
  grid-area: backLink;
  width: fit-content;
  height: fit-content;
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
// const SpeechTitle = styled.h2`
//   font-size: 1.2rem;
//   line-height: 1.6rem;
// `

// const SpeechInformation = styled.section`
//   grid-area: information;
//   h3 {
//     font-size: 1rem;
//   }
// `

const VideoStyled = styled.video`
  width: 100%;
  height: auto;
  margin-top: 12px;
  grid-area: video;
`

// const SpeechDescription = styled.p`
//   line-height: 1.4rem;
// `

// const SpeechDetails = styled.p`
//   display: flex;
//   justify-content: space-between;
//   grid-gap: 4px;
//   color: var(--secondary-font-color);
//   margin-bottom: 0;
// `

const TabContainerStyled = styled.section`
  grid-area: tab;
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
`
