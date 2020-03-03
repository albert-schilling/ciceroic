import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components/macro'

export default function Video({ videos }) {
  return (
    <>
      <NavLink exact to="/">
        back
      </NavLink>
      <h1>Video Detail Page</h1>
    </>
  )
}
