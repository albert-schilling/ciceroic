import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components/macro'
import Wrapper from '../../Layouts/Wrapper/Wrapper'

const Portal = ({ children, storybook }) => {
  if (storybook && !document.getElementById('modal')) {
    const storybookModal = document.createElement('div')
    storybookModal.id = 'modal'
    document.body.appendChild(storybookModal)
  }

  return ReactDOM.createPortal(children, document.getElementById('modal'))
}

export default function Modal({
  children = [<>Default Modal Button</>, <>Default Modal Content</>],
  size = 'small',
  storybook = false,
}) {
  const [visibility, setVisibility] = useState(false)
  return (
    <>
      <Button onClick={handleClick}>{children[0]}</Button>
      {visibility && (
        <Portal storybook={storybook}>
          <Wrapper
            size={size}
            visible={visibility}
            setVisibility={setVisibility}
          >
            {children[1]}
          </Wrapper>
        </Portal>
      )}
    </>
  )
  function handleClick(event) {
    event.preventDefault()
    console.log('HandleClick called')
    setVisibility(true)
  }
}

const Button = styled.button`
  border: none;
  padding: 0;
  background: none;
  font-size: 1rem;
  font-family: inherit;
  font-weight: inherit;
  color: var(--highlight-color);
  cursor: pointer;
`
