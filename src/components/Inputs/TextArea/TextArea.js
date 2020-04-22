import React, { useState, useEffect } from 'react'
import styled from 'styled-components/macro'

export default function TextArea({
  title = 'default textarea',
  name = 'default name',
  id = 'defaultTextArea',
  rows = 3,
  cols = 100,
  maxLength = 50,
  placeholder = 'Type here',
  reference,
  callback = () => {},
  initialValue = '',
}) {
  const [textArea, setTextArea] = useState('')
  useEffect(() => {
    setTextArea(`${initialValue}`)
  }, [])

  return (
    <TextAreaContainer>
      <TextAreaCounter className={textArea.length === maxLength && 'warning'}>
        {/* {textArea.length}/{maxLength} */}
        maximum length: {maxLength}
      </TextAreaCounter>
      <TextAreaSection className={textArea.length === maxLength && 'warning'}>
        <TextAreaLabel id="textboxLabel" htmlFor={id}>
          {title}
        </TextAreaLabel>
        <TextAreaStyled
          role="textbox"
          contenteditable="true"
          aria-placeholder={placeholder}
          aria-labelledby="textboxLabel"
          type="textarea"
          name={name}
          id={id}
          rows={rows}
          cols={cols}
          placeholder={placeholder}
          maxLength={maxLength}
          onChange={handleChange}
          value={textArea}
          ref={reference}
        ></TextAreaStyled>
      </TextAreaSection>
    </TextAreaContainer>
  )
  function handleChange(event) {
    event.preventDefault()
    event.stopPropagation()
    const maximumInput = event.target.value.slice(0, maxLength)
    setTextArea(maximumInput)
    callback(event)
  }
}
const TextAreaContainer = styled.section`
  display: grid;
  grid-gap: 2px;
`
const TextAreaCounter = styled.span`
  text-align: right;
  font-size: 0.8rem;
  &.warning {
    color: var(--secondary-highlight-color);
  }
`
const TextAreaSection = styled.section`
  display: grid;
  grid-gap: 4px;
  border: 1px solid var(--primary-font-color);
  padding: 8px;
  &.warning {
    box-shadow: 0 0 4px 0 var(--secondary-highlight-color);
  }
`
const TextAreaStyled = styled.textarea`
  border: none;
  padding: 0;
  width: 100%;
  font-family: inherit;
  font-size: 0.9rem;
  font-weight: inherit;
`

const TextAreaLabel = styled.label`
  margin: 0;
  font-size: 0.8rem;
  color: var(--primary-font-color);
`
