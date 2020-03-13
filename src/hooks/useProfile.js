import { useState } from 'react'

export default function useProfile() {
  const [profile, setProfile] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    id: '',
  })

  return { profile, setProfile }
}
