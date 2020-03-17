import { useState } from 'react'

export default function useSpeech() {
  const [speeches, setSpeeches] = useState([])
  const [speech, setSpeech] = useState({})
  const [editMode, setEditMode] = useState(false)

  function calculateAverageEvaluation(speech) {
    let average
    !!speech.evaluations && !!speech.evaluations.length
      ? (average = speech.evaluations.reduce((average, evaluation) => {
          Object.entries(evaluation.dimensions).forEach(dimension => {
            const index = average.findIndex(
              dimensionAverage => dimensionAverage.name === dimension[0]
            )
            index >= 0
              ? (() => {
                  average[index].sum += dimension[1]
                  average[index].count++
                  average[index].average =
                    Math.round(
                      (average[index].sum / average[index].count) * 100
                    ) / 100
                })()
              : average.push({
                  name: dimension[0],
                  sum: dimension[1],
                  count: 1,
                  average: dimension[1],
                })
          })
          return average
        }, []))
      : (average = [])
    return average
  }
  function returnDimensionsFromAverage(average) {
    const dimensions = average.map(dimension => {
      return [dimension.name, dimension.average]
    })
    return dimensions
  }

  return {
    speech,
    setSpeech,
    speeches,
    setSpeeches,
    editMode,
    setEditMode,
    calculateAverageEvaluation,
    returnDimensionsFromAverage,
  }
}
