import React from 'react'
import styled from 'styled-components/macro'
import IconClose from '../../Inputs/Icons/IconClose'
export default function Wrapper({
  children = <></>,
  visible = false,
  setVisibility = () => {},
  size = 'small',
}) {
  return (
    <Background
      //  visible={visible}
      className={visible && 'visible'}
      onClick={handleClick}
    >
      <WrapperStyled size={size} onClick={event => event.stopPropagation()}>
        <IconClose position="topright" callback={handleClick} />

        {children}
      </WrapperStyled>
    </Background>
  )
  function handleClick(event) {
    event.preventDefault()
    setVisibility(false)
  }
}

const Background = styled.section`
  position: fixed;
  top: 0;
  left: 0;
  /* display: ${props => (props.hidden ? 'none' : 'grid')};
   */
  display: none;
  align-content: center;
  margin: 0;
  padding: 80px 20px 20px 20px;
  overflow-y: scroll;
  height: 100vh;
  width: 100%;
  &.visible {
    display: grid;
  }
`

const WrapperStyled = styled.div`
  position: relative;
  display: grid;
  justify-self: center;
  align-content: flex-start;
  height: 100%;
  width: 100%;
  border: 1px solid var(--highlight-color);
  padding: 20px;
  background: #fff;
  overflow-y: scroll;
  max-width: ${props => {
    return (
      (props.size === 'small' && '400px') ||
      (props.size === 'medium' && '700px') ||
      (props.size === 'large' && '1200px')
    )
  }};
`
