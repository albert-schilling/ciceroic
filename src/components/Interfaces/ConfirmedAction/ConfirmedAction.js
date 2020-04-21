import React, { useState } from 'react'
import styled from 'styled-components/macro'
import Button from '../../Inputs/Button/Button'
import InsideMessage from '../../UserMessage/InsideMessage'

export default function ConfirmedAction({
  cancelText = 'Cancel',
  submitText = 'Update',
  submitColor = 'primary',
  callback = () => {},
  message = {
    text: 'Update succesfull.',
    visible: true,
    style: 'confirmation',
  },
  setMessage = () => {},
}) {
  const [confirmation, setConfirmation] = useState(false)

  return (
    <Container>
      {confirmation ? (
        <ButtonRow>
          <Button
            text={cancelText}
            styling="tertiary"
            callback={handleCancel}
          />
          <Button
            type={'submit'}
            text={submitText}
            styling={submitColor}
            callback={handleSubmit}
          />
        </ButtonRow>
      ) : (
        <Button
          text={submitText}
          styling={submitColor}
          callback={handleClick}
        />
      )}
      {message.visible && <InsideMessage message={message} />}
    </Container>
  )
  function handleClick(event) {
    event.preventDefault()
    setMessage({ text: 'Are you sure?', visible: true, style: 'warning' })
    setConfirmation(true)
  }
  function handleCancel(event) {
    event.preventDefault()
    setMessage({ ...message, text: '', visible: false })
    setConfirmation(false)
  }
  function handleSubmit(event) {
    event.preventDefault()
    callback(event)
  }
}

const ButtonRow = styled.section`
  display: grid;
  grid-template: auto / max-content max-content;
  grid-gap: 12px;
`

const Container = styled.section`
  width: fit-content;
`
