import { useState } from 'react'
import {
  postSpeech,
  patchSpeech,
  uploadSpeech,
} from '../services/speechServices'
import { storage } from '../services/firebase'
import firebase from 'firebase/app'

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

  async function submitSpeech({ speech, setSpeech, video, setUploadProgress }) {
    console.log('submitSpeech called. speech:', speech, 'video:', video)
    const id = await postSpeech(speech)
    console.log('Retrieved id from postSpeech:', id)

    const storageFilename = `user_${speech.userId}_speech_${id}_${speech.filename}`
    const upload = uploadSpeech(video, storageFilename)
    console.log('Got response (upload) from uploadSpeech:', upload)
    Object.assign(speech, {
      _id: id,
      uploadStatus: 'uploading',
      status: 'submitted',
    })
    setSpeech(speech)
    console.log('Speech after upload started:', speech)

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    upload.on(
      'state_changed',
      function(snapshot) {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        setUploadProgress(progress)
        console.log('Upload is ' + progress + '% done')
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            Object.assign(speech, { uploadStatus: 'paused' })
            setSpeech(speech)
            console.log('Upload is paused')
            break
          case firebase.storage.TaskState.RUNNING: // or 'running'
            Object.assign(speech, { uploadStatus: 'uploading' })
            setSpeech(speech)
            console.log('Upload is running')
            break
        }
      },
      function(error) {
        // Handle unsuccessful uploads
        Object.assign(speech, { uploadStatus: 'error' })
        setSpeech(speech)
        console.error('Error uploading:', error)
      },
      async function() {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        const url = await upload.snapshot.ref.getDownloadURL()

        Object.assign(speech, { uploadStatus: 'uploaded', fileUrl: url })
        setSpeech(speech)
        console.log('Uploading video successful. Speech:', speech)
        patchSpeech(speech._id, speech)
      }
    )
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
