import React from 'react'
import styled from 'styled-components/macro'

export default function VideoEvaluationInputRange({
  name,
  description,
  value,
  setValue,
}) {
  return (
    <>
      <label htmlFor={name} title={description}>
        {name}: {value[name]}
        <input
          onChange={handleChange}
          type="range"
          value={value[name]}
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
    setValue({ ...value, [name]: Number(event.target.value) })
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
