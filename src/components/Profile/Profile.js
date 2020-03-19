import React, { useState } from 'react'
import styled from 'styled-components/macro'
import PropTypes from 'prop-types'
import { Main } from '../Standard/StandardComponents'
import DefaultButton from '../Inputs/Buttons/DefaultButton'
import IconSignOut from '../Inputs/Icons/IconSignOut'
import { updateAbout } from '../../services/userServices'

export default function Profile({
  profile = {
    id: '23p48qyfguisrhgfiu',
    email: 'maxpower@heroes.world',
    password: 'skdflksdjfgiu',
    firstName: 'Max',
    lastName: 'Power',
    image: '',
    about:
      'I joined Ciceroic because I might be a great hero but I am not a heroic speaker.',
  },
  setProfile = () => {},
  logOut = () => {},
}) {
  const [editMode, setEditMode] = useState(false)

  return (
    <Main>
      <Portrait>
        <img
          src={
            profile.image.length > 0
              ? profile.image
              : '/images/default_protrait_cicero_001.jpg'
          }
        />
      </Portrait>

      <Name>
        {profile.firstName} {profile.lastName}
      </Name>
      {editMode ? (
        <>
          <AboutInput
            name="about"
            value={profile.about}
            onChange={handleChange}
            rows="5"
          />
          <DefaultButton
            name="updateAbout"
            callback={handleClick}
            text="Done"
            color="primary"
          />
        </>
      ) : (
        <>
          <About>{profile.about}</About>
          <DefaultButton
            text="Edit bio"
            color="tertiary"
            callback={() => setEditMode(true)}
          />
        </>
      )}

      <Paragraph>{profile.email}</Paragraph>
      <DefaultButton text="Change password" color="tertiary" />
      <Line>
        <IconSignOut
          width="20px"
          height="24px"
          color="var(--secondary-font-color)"
          callback={logOut}
        />
        Log out
      </Line>
    </Main>
  )
  function handleChange(event) {
    setProfile({ ...profile, [event.target.name]: event.target.value })
  }
  function handleClick(event) {
    setEditMode(false)
    event.target.name === 'updateAbout' && updateAbout(profile)
  }
}

Profile.propTypes = {
  profile: PropTypes.shape({
    id: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    image: PropTypes.string,
    about: PropTypes.string,
  }),
}

const Portrait = styled.section`
  justify-self: center;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin: 0 0 20px 0;
  border: 2px solid var(--light-grey);
  border-radius: 50%;
  width: 150px;
  height: 150px;
  overflow: hidden;
  cursor: pointer;
`
const Name = styled.h3`
  font-size: 1rem;
  font-weight: 500;
`

const About = styled.p`
  margin: 0;
  line-height: 1.4rem;
`

const Paragraph = styled.p`
  margin: 12px 0;
`
const Line = styled.p`
  display: grid;
  grid-template: auto / 20px auto;
  grid-gap: 8px;
  align-items: center;
  margin: 12px 0;
`

const AboutInput = styled.textarea`
  margin: 0;
  border: 1px solid var(--light-grey);
  border-radius: 4px;
  padding: 4px 8px;
  font-family: inherit;
  font-size: 0.9rem;
  line-height: 1.4rem;
  font-weight: inherit;
`
