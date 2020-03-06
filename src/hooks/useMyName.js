import React, { useState } from 'react'

export default function useMyName(initialName) {
  const [currentName, setCurrentName] = useState(initialName)

  return [
    newName => setCurrentName(newName),
    `My name is ${currentName}.`,
    ['Jack', 'Larry', 'Tom'].map(item => [
      <input
        type="radio"
        name="names"
        key={item}
        value={item}
        checked={currentName === item}
        onChange={() => setCurrentName(item)}
      />,
      <span>{item}</span>,
      <br />,
    ]),
  ]
}
