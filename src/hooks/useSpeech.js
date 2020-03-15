import { useState } from 'react'

export default function useSpeech() {
  const [speeches, setSpeeches] = useState([])
  const [speech, setSpeech] = useState({})
  const [editMode, setEditMode] = useState(false)

  return { speech, setSpeech, speeches, setSpeeches, editMode, setEditMode }
}
