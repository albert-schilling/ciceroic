import React from 'react'
import styled from 'styled-components/macro'
import IconClose from '../../Icons/IconClose'
export default function Wrapper({
  children = <></>,
  visible = false,
  setVisibility = () => {},
  size = 'small',
}) {
  return (
    <Background className={visible && 'visible'} onClick={handleClick}>
      <WrapperStyled size={size} onClick={event => event.stopPropagation()}>
        <Header>
          <IconClose position="topright" callback={handleClick} />
        </Header>
        <Content>{children}</Content>
      </WrapperStyled>
    </Background>
  )
  function handleClick(event) {
    event.preventDefault()
    setVisibility(false)
  }
}

const Background = styled.section`
  z-index: 20;
  position: fixed;
  top: 0;
  left: 0;
  display: none;
  align-content: flex-start;
  justify-items: center;
  margin: 0;
  padding: 80px 20px 20px 20px;
  height: 100vh;
  width: 100%;
  &.visible {
    display: grid;
  }
`

const WrapperStyled = styled.div`
  position: relative;
  display: grid;
  grid-template: 60px auto / 1fr;
  height: 100%;
  width: 100%;
  max-width: ${props => {
    return (
      (props.size === 'small' && '400px') ||
      (props.size === 'medium' && '700px') ||
      (props.size === 'large' && '1200px')
    )
  }};
  border: 1px solid var(--highlight-color);
  background: #fff;
  overflow: hidden;
  font-size: 1rem;
  line-height: 140%;
  box-shadow: 0 0 40px #666;
`

const Header = styled.header`
  background: linear-gradient(to bottom, #fff, rgba(#fff, 0));
`

const Content = styled.div`
  padding: 20px;
  overflow-y: scroll;
  > p:last-child {
    padding-bottom: 80px;
  }
`
