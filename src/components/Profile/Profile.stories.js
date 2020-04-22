import React from 'react'
import { action } from '@storybook/addon-actions'

import Profile from './Profile'

export default {
  title: 'Components/Pages/Profile',
  component: Profile,
}

const profile = {
  id: '23p48qyfguisrhgfiu',
  email: 'maxpower@heroes.world',
  password: 'skdflksdjfgiu',
  firstName: 'Max',
  lastName: 'Power',
  portrait: '',
  about:
    'I joined Ciceroic because I might be a great hero but I am not a heroic speaker.',
}

export const DefaultProfile = () => {
  return (
    <Profile modal={'profile'} useLoading={false} exampleProfile={profile} />
  )
}
