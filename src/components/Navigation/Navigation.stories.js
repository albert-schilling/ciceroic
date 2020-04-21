import React from 'react'
import Navigation from './Navigation'

export default {
  title: 'Components/Navigation',
  component: Navigation,
}

export const DefaultNavigation = () => {
  return <Navigation user={{ status: 'signedIn' }} />
}
