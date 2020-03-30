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
      <Label htmlFor={name} title={description}>
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
      </Label>
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
    font-size: 0.4rem;
    color: var(--secondary-font-color);
  }
`

const Label = styled.label`
  display: grid;
  grid-gap: 6px;
  width: 100%;

  input[type='text'] {
    font-size: 1rem;
  }

  input[type='range'] {
    -webkit-appearance: none;
    -moz-appearance: none;
    background: transparent;
  }
  input[type='range']::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 16px;
    width: 16px;
    margin-top: -6px;
    border-radius: 8px;
    border: 1px solid #fff;
    background: var(--secondary-highlight-color);
  }
  input[type='range']::-moz-range-thumb {
    -webkit-appearance: none;
    height: 16px;
    width: 16px;
    margin-top: -6px;
    border-radius: 8px;
    border: 1px solid #fff;
    background: var(--secondary-highlight-color);
  }
  input[type='range']::-moz-range-track {
    width: 100%;
    height: 4px;
    background: var(--highlight-color);
    border-radius: 2px;
  }
  input[type='range']::-webkit-slider-runnable-track {
    width: 100%;
    height: 4px;
    background: var(--highlight-color);
    border-radius: 2px;
  }
`
