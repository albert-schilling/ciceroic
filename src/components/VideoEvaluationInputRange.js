import React from 'react'
import styled from 'styled-components/macro'

export default function VideoEvaluationInputRange({
  name,
  description,
  value,
  setValue,
  evaluation,
  setEvaluation,
}) {
  return (
    <>
      <label htmlFor={name} title={description}>
        {name}: {evaluation.dimensions[name]}
        <input
          onChange={handleChange}
          type="range"
          value={evaluation.dimensions[name]}
          min="1"
          max="5"
          step="1"
          name={name}
          id={name}
        />
        <VideoEvaluationRangeScale>
          <span>|</span>
          <span>|</span>
          <span>|</span>
          <span>|</span>
          <span>|</span>
        </VideoEvaluationRangeScale>
      </label>
    </>
  )
  function handleChange(event) {
    // setValue({ ...value, [name]: Number(event.target.value) })
    setEvaluation({
      ...evaluation,
      dimensions: {
        ...evaluation.dimensions,
        [name]: Number(event.target.value),
      },
    })
    console.log(evaluation)
  }
}

const VideoEvaluationRangeScale = styled.div`
  display: flex;
  justify-content: space-between;
  span {
    margin-top: -12px;
    font-size: 0.4rem;
    color: var(--secondary-font-color);
  }
`
