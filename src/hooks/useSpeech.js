import { useState } from 'react'
import { postSpeech, uploadSpeech } from '../services/speechServices'

export default function useSpeech() {
  const [speeches, setSpeeches] = useState([])
  const [speech, setSpeech] = useState({})
  const [editMode, setEditMode] = useState(false)

  function calculateAverageEvaluation(speech) {
    const average = speech.evaluations
      ? speech.evaluations.reduce((acc, evaluation) => {
          Object.entries(evaluation.dimensions).forEach(dimension =>
            returnAccumulatedAverage(acc, dimension)
          )
          return acc
        }, [])
      : []
    return average
  }

  function returnAccumulatedAverage(acc, dimension) {
    const index = acc.findIndex(
      dimensionAverage => dimensionAverage.name === dimension[0]
    )
    index >= 0
      ? (() => {
          acc[index].sum += dimension[1]
          acc[index].count++
          acc[index].average =
            Math.round((acc[index].sum / acc[index].count) * 100) / 100
        })()
      : acc.push({
          name: dimension[0],
          sum: dimension[1],
          count: 1,
          average: dimension[1],
        })
  }

  function returnDimensionsFromAverage(average) {
    const dimensions = average.map(dimension => {
      return { name: dimension.name, value: dimension.average }
    })
    return dimensions
  }

  function returnDimensionsFromEvaluation(dimensionsFormEvaluation) {
    const dimensions = Object.entries(dimensionsFormEvaluation).map(
      dimension => {
        return { name: dimension[0], value: dimension[1] }
      }
    )
    return dimensions
  }

  function submitSpeech({ speech, video }) {
    console.log('submitSpeech called. speech:', speech, 'video:', video)
    const storageFilename = `user_${speech.userId}_speech_${speech.filename}`
    uploadSpeech(video, storageFilename).then(url => {
      speech.url = url
      postSpeech(speech)
    })
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
    returnDimensionsFromEvaluation,
    submitSpeech,
  }
}
