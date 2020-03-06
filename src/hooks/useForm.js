import React, { useState } from 'react'

export default function useForm(evaluationDimensions) {
  const initialValues = {}

  evaluationDimensions.map(dimension =>
    Object.assign(initialValues, { [dimension.name]: 3 })
  )
  return [initialValues]
}
