import React, { useState } from 'react'
import styled from 'styled-components/macro'
import DefaultButton from '../../Inputs/Buttons/DefaultButton'

export default function ConfirmedAction({
  cancelText = 'Cancel',
  submitText = 'Update',
  callback = () => {},
  messageText = 'Update succesfull',
}) {
  const [confirmation, setConfirmation] = useState(false)
  const [message, setMessage] = useState({
    visible: false,
    text: '',
  })
  return (
    <>
      {confirmation ? (
        <ButtonsRow>
          <DefaultButton
            text={cancelText}
            color="tertiary"
            callback={() => setConfirmation(false)}
          />
          <DefaultButton
            type={'submit'}
            text={submitText}
            color="primary"
            callback={handleSubmit}
          />
          {message.visible && <Message>{message.text}</Message>}
        </ButtonsRow>
      ) : (
        <DefaultButton
          text={submitText}
          color="primary"
          callback={() => setConfirmation(true)}
        />
      )}
    </>
  )
  function handleSubmit(event) {
    event.preventDefault()
    setMessage({
      visible: true,
      text: messageText,
    })
    callback()
  }
}

const ButtonsRow = styled.section`
  display: grid;
  grid-template: auto auto / max-content max-content;
  grid-gap: 20px;
`

const Message = styled.p`
  order: 2;
  width: 100%;
  border: 1px solid var(--secondary-highlight-color);
  padding: 20px;
  color: var(--secondary-highlight-color);
`

// ;<PasswordForm onSubmit={handleSubmitNewPassword}>
//   <Paragraph>Email: {profile.email}</Paragraph>

//   {editPassword ? (
//     <>
//       <PasswordLabel htmlFor="oldPassword">
//         Confirm current password:
//         <Password id="oldPassword" name="oldPassword" type="password" />
//       </PasswordLabel>

//       {authenticationTries === 3 && (
//         <PasswordLabel htmlFor="sendNewPassword">
//           Forgot your password?
//           {waitingForServer ? (
//             <DefaultButton
//               name="sendNewPassword"
//               id="sendNewPassword"
//               text="Send me a new password"
//               color="loading"
//               disabled="true"
//             />
//           ) : (
//             <DefaultButton
//               name="sendNewPassword"
//               id="sendNewPassword"
//               text="Send me a new password"
//               color="secondary"
//               callback={handleClick}
//             />
//           )}
//         </PasswordLabel>
//       )}
//       {allowNewPassword ? (
//         <>
//           <PasswordLabel htmlFor="newPassword">
//             New password:
//             <Password id="newPassword" name="newPassword" type="password" />
//           </PasswordLabel>
//           <PasswordLabel htmlFor="repeatNewPassword">
//             Confirm new password:
//             <Password
//               id="repeatNewPassword"
//               name="repeatNewPassword"
//               type="password"
//             />
//           </PasswordLabel>
//           <DefaultButton
//             name="confirmChangePassword"
//             text="Update Password"
//             color="primary"
//             type="submit"
//           />
//         </>
//       ) : (
//         <>
//           {waitingForServer ? (
//             <DefaultButton
//               name="sentOldPassword"
//               text="Update Password"
//               color="loading"
//               type="submit"
//               disabled="true"
//             />
//           ) : (
//             <DefaultButton
//               name="sentOldPassword"
//               text="Update Password"
//               color="primary"
//               type="submit"
//             />
//           )}
//         </>
//       )}

//       <DefaultButton
//         name="cancelChangePassword"
//         text="Cancel"
//         color="tertiary"
//         callback={handleClick}
//       />
//       {passwordMessage.visible && (
//         <PasswordMessage>{passwordMessage.text}</PasswordMessage>
//       )}
//     </>
//   ) : (
//     <DefaultButton
//       name="changePassword"
//       text="Change password"
//       color="tertiary"
//       callback={() => setConfirmation(true)}
//     />
//   )}
// </PasswordForm>
