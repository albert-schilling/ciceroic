import { useState } from 'react'

export default function useTab() {
  const [activeTab, setActiveTab] = useState('')
  function handleClick(ref) {
    setActiveTab(ref)
  }
  return { activeTab, setActiveTab, handleClick }
}
