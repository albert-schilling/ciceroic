import { useState } from 'react'

export default function useProfile() {
  const [profile, setProfile] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    id: '',
  })

  const [profileRetrieved, setProfileRetrieved] = useState(false)

  return { profile, setProfile, profileRetrieved, setProfileRetrieved }
}
