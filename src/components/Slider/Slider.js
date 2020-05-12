import React, { useEffect, useState, useRef } from 'react'
import styled from 'styled-components/macro'
import PropTypes from 'prop-types'
import SpeechThumbnail from '../Speech/Thumbnail/SpeechThumbnail'
import useWindowSize from '../../hooks/useWindowSize'

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

  const size = useWindowSize()

  const slideStep = containerRef.current
    ? calculateSlideStep(containerRef.current.getBoundingClientRect().width)
    : 200

  useEffect(() => {
    setDisableLeftButton(transition >= 0)
    setDisableRightButton(
      contentRef.current.getBoundingClientRect().width + transition <
        containerRef.current.getBoundingClientRect().width
    )
  }, [size.width, transition])

  return speeches.length > 0 ? (
    <Container ref={containerRef}>
      <Title>{title}</Title>
      <Carousel>
        <Button
          style={{ left: 0 }}
          ref={buttonLeftRef}
          onClick={e => {
            e.preventDefault()
            setTransition(transition < 0 ? transition + slideStep : transition)
          }}
          disabled={disableLeftButton}
        >
          {'<'}
        </Button>
        <Stage>
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
        </Stage>
        <Button
          style={{ right: 0 }}
          ref={buttonRightRef}
          onClick={e => {
            e.preventDefault()
            setTransition(
              contentRef.current.getBoundingClientRect().width + transition >
                containerRef.current.getBoundingClientRect().width
                ? transition - slideStep
                : transition
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

  function calculateSlideStep(containerWidth) {
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
`

const Title = styled.h2`
  position: absolute;
  background: var(--highlight-color);
  color: var(--inverse-primary-font-color);
  width: max-content;
  padding: 8px;
  font-size: 1.4rem;
  z-index: 2;
  box-shadow: 4px 4px 8px #333;
`

const Carousel = styled.div`
  margin-top: 40px;
  position: relative;
  width: 100%;
  display: grid;
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
  box-shadow: 2px 2px 4px #999;
  :disabled {
    background: var(--grey);
    cursor: unset;
  }
`

const Stage = styled.div`
  display: grid;
  overflow: hidden;
  margin: 0 12px;
  width: calc(100% - 24px);
`
const Content = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-gap: 8px;
  justify-items: start;
  margin-left: 44px;

  transform: ${props => `translateX(${props.transition}px)`};
  width: max-content;
  transition: transform 0.4s ease-in-out;
`
