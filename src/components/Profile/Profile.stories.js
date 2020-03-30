import React from 'react'
import { mobile } from '../../common/storybookDecorator'
import { action } from '@storybook/addon-actions'

import Profile from './Profile'

export default {
  title: 'Components/Profile',
  decorators: [storyFn => <section style={mobile}>{storyFn()}</section>],
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
  return <Profile profile={profile} />
}
