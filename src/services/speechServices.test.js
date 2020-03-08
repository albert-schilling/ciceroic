import { getSpeeches, patchSpeech } from './speechServices'

describe('getSpeeches', () => {
  it('returns an array', () => {
    expect(getSpeeches().then(res => Array.isArray(res))).resolves.toBe(true)
  })
})

describe('patchSpeech', () => {
  it('patches an entry and gets back the updated array', async () => {
    const speechNumber = Math.floor(Math.random() * 5 + 1)
    const speech = await getSpeeches(speechNumber)
    const randomFirstName = 'TestNr' + Math.floor(Math.random() * 1000000)
    const randomLastName = 'TestNr' + Math.floor(Math.random() * 1000000)
    const date = new Date().getTime()
    const evaluation = {
      dimensions: {
        'Gestures And Facial Expressions': 3,
        'Pronounciation and Vocal Variety': 3,
        'Comprehensibility and Structure': 3,
        'Stylistic Devices': 3,
        'Credible and Convincing': 3,
      },
      evaluator: { firstName: randomFirstName, lastName: randomLastName },
      date: date,
    }
    speech.evaluations.push(evaluation)

    await patchSpeech(speechNumber, speech)
    const updatedSpeech = await getSpeeches(speechNumber)
    const updatedEvaluation =
      updatedSpeech.evaluations[updatedSpeech.evaluations.length - 1]

    expect(updatedEvaluation.evaluator.firstName === randomFirstName).toBe(true)
    expect(updatedEvaluation.evaluator.lastName === randomLastName).toBe(true)
    expect(updatedEvaluation.date === date).toBe(true)
  })
})
