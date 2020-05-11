import React, { useEffect, useState, useRef } from 'react'
import styled from 'styled-components/macro'
import PropTypes from 'prop-types'
import SpeechThumbnail from '../Speech/Thumbnail/SpeechThumbnail'

export default function Slider({
  title = 'Speeches Slider',
  speeches = [],
  setSpeech = () => {},
  setActivePage = () => {},
  setModal = () => {},
}) {
  const containerRef = useRef(null)
  const contentRef = useRef(null)
  const buttonLeftRef = useRef(null)
  const buttonRightRef = useRef(null)
  const [transition, setTransition] = useState(0)
  const [disableLeftButton, setDisableLeftButton] = useState(false)
  const [disableRightButton, setDisableRightButton] = useState(false)

  useEffect(() => {
    setDisableLeftButton(
      calculatePositionDifference(
        contentRef.current.getBoundingClientRect().left,
        buttonLeftRef.current.getBoundingClientRect().left
      )
    )
    setDisableRightButton(
      calculatePositionDifference(
        buttonRightRef.current.getBoundingClientRect().right,
        contentRef.current.getBoundingClientRect().right
      )
    )
  }, [])

  const slidingStep = containerRef.current
    ? calculateSlideStepSize(containerRef.current.getBoundingClientRect().width)
    : 200

  return speeches.length > 0 ? (
    <Container ref={containerRef}>
      <Title>{title}</Title>
      <Carousel>
        <Button
          style={{ left: 0 }}
          ref={buttonLeftRef}
          onClick={e => {
            e.preventDefault()
            setTransition(transition + slidingStep)
            setDisableLeftButton(
              calculatePositionDifference(
                contentRef.current.getBoundingClientRect().left + slidingStep,
                buttonLeftRef.current.getBoundingClientRect().left
              )
            )
            setDisableRightButton(
              calculatePositionDifference(
                buttonRightRef.current.getBoundingClientRect().right,
                contentRef.current.getBoundingClientRect().right + slidingStep
              )
            )
          }}
          disabled={disableLeftButton}
        >
          {'<'}
        </Button>
        <Content ref={contentRef} transition={transition}>
          {speeches?.map(speech => (
            <SpeechThumbnail
              key={speech._id}
              speech={speech}
              setSpeech={setSpeech}
              setActivePage={setActivePage}
              setModal={setModal}
            />
          ))}
        </Content>
        <Button
          style={{ right: 0 }}
          ref={buttonRightRef}
          onClick={e => {
            e.preventDefault()
            setTransition(transition - slidingStep)
            setDisableLeftButton(
              calculatePositionDifference(
                contentRef.current.getBoundingClientRect().left - slidingStep,
                buttonLeftRef.current.getBoundingClientRect().left
              )
            )
            setDisableRightButton(
              calculatePositionDifference(
                buttonRightRef.current.getBoundingClientRect().right,
                contentRef.current.getBoundingClientRect().right - slidingStep
              )
            )
          }}
          disabled={disableRightButton}
        >
          {'>'}
        </Button>
      </Carousel>
    </Container>
  ) : (
    <></>
  )

  function calculatePositionDifference(a, b) {
    return b <= a ? true : false
  }
  function calculateSlideStepSize(containerWidth) {
    const maxSlideStep = 400
    if (containerWidth - (containerWidth % 200) > maxSlideStep) {
      return maxSlideStep
    } else {
      return containerWidth - (containerWidth % 200)
    }
  }
}

Slider.propTypes = {
  speeches: PropTypes.array.isRequired,
}

const Container = styled.article`
  position: relative;
  width: 100%;
  overflow: hidden;
`
const Carousel = styled.div`
  position: relative;
  width: 100%;
  display: grid;
  grid-template: auto / max-content auto max-content;
  align-items: center;
`

const Button = styled.button`
  z-index: 2;
  position: absolute;
  margin: 12px 0;
  border: none;
  padding: 8px;
  background: var(--highlight-color);
  color: var(--inverse-primary-font-color);
  font-size: 1rem;
  cursor: pointer;
`

const Content = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-gap: 8px;
  justify-items: start;
  padding: 0 44px;
  transform: ${props => `translateX(${props.transition}px)`};
  width: 100%;
  transition: transform 0.4s ease-in-out;
`
const Title = styled.h2`
  background: var(--highlight-color);
  color: var(--inverse-primary-font-color);
  width: max-content;
  padding: 8px;
`
