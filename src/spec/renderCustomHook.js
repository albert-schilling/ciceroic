import React from 'react'
import { render } from '@testing-library/react'

export default function renderCustomHook(hook) {
  const Component = ({ children, ...rest }) => children(hook(rest))
  function setup(props) {
    const returnVal = {}
    render(
      <Component {...props}>
        {val => {
          Object.assign(returnVal, val)
          return null
        }}
      </Component>
    )
    return returnVal
  }
  return setup()
}
