import { useState } from 'react'

export default function useSpeech({ userID = '' }) {
  const [speeches, setSpeeches] = useState([])
  const [speech, setSpeech] = useState({})

  return { speech, setSpeech, speeches, setSpeeches }
}
