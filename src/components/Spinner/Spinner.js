import React from 'react'
import styled from 'styled-components/macro'

export default function Spinner() {
  return (
    <SpinnerStyled>
      <SpinnerBalls />
    </SpinnerStyled>
  )
}

const SpinnerStyled = styled.section`
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
