import React from 'react'
import { mobile } from '../../../common/storybookDecorator'
import DeleteUser from './DeleteUser'

export default {
  title: 'Components/Interfaces/Profile/DeleteUser',
  decorators: [storyFn => <section style={mobile}>{storyFn()}</section>],
  component: DeleteUser,
}

export const DefaultDeleteUser = () => {
  return <DeleteUser />
}
