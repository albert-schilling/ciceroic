import React, { useState } from 'react'
import styled from 'styled-components/macro'
import Wrapper from '../../Layouts/Wrapper/Wrapper'

export default function PopUp({
  children = [<>Default Pop Up Button</>, <>Default Pop Up Content</>],
  size = 'small',
}) {
  const [visibility, setVisibility] = useState(false)
  return (
    <>
      <Button onClick={handleClick}>{children[0]}</Button>
      <Wrapper size={size} visible={visibility} setVisibility={setVisibility}>
        {children[1]}
      </Wrapper>
    </>
  )
  function handleClick(event) {
    event.preventDefault()
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
