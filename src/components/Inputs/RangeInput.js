import React from 'react'
import styled from 'styled-components/macro'

export default function RangeInput({
  name,
  description,
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
        <InputRangeScale>
          <span>|</span>
          <span>|</span>
          <span>|</span>
          <span>|</span>
          <span>|</span>
        </InputRangeScale>
      </label>
    </>
  )
  function handleChange(event) {
    setEvaluation({
      ...evaluation,
      dimensions: {
        ...evaluation.dimensions,
        [name]: Number(event.target.value),
      },
    })
  }
}

const InputRangeScale = styled.div`
  display: flex;
  justify-content: space-between;
  span {
    /* margin-top: -12px; */
    font-size: 0.4rem;
    color: var(--secondary-font-color);
  }
`
