import React, { useState } from 'react'
import styled from 'styled-components/macro'
import DefaultButton from '../../Inputs/Buttons/DefaultButton'
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
          <DefaultButton
            text={cancelText}
            color="tertiary"
            callback={() => setConfirmation(false)}
          />
          <DefaultButton
            type={'submit'}
            text={submitText}
            color={submitColor}
            callback={handleSubmit}
          />
        </ButtonRow>
      ) : (
        <DefaultButton
          text={submitText}
          color={submitColor}
          callback={handleClick}
        />
      )}
      {message.visible && <InsideMessage message={message} />}
    </Container>
  )
  function handleClick(event) {
    setMessage({ text: 'Are you sure?', visible: true, style: 'warning' })
    setConfirmation(true)
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
