import { useState } from 'react'

export default function useSignUpForm() {
  const [userData, setUserData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    id: '',
  })

  return { userData, setUserData }
}
