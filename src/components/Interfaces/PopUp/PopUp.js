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
      <Button onClick={() => setVisibility(true)}>{children[0]}</Button>
      <Wrapper size={size} visible={visibility} setVisibility={setVisibility}>
        {children[1]}
      </Wrapper>
    </>
  )
}

const Button = styled.button`
  border: none;
  background: none;
  font-size: inherit;
  font-family: inherit;
  font-weight: inherit;
  color: var(--highlight-color);
  cursor: pointer;
`
