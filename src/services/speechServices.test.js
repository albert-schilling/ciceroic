// import { getSpeeches, patchSpeech } from './speechServices'

// describe('getSpeeches', () => {
//   it('returns an array', () => {
//     expect(getSpeeches().then(res => Array.isArray(res))).resolves.toBe(true)
//   })
// })

// describe('patchSpeech', () => {
//   it.skip('patches an entry and gets back the updated array', async () => {
//     const speechNumber = Math.floor(Math.random() * 5 + 1)
//     const speech = await getSpeeches(speechNumber)
//     const randomFirstName = 'TestNr' + Math.floor(Math.random() * 1000000)
//     const randomLastName = 'TestNr' + Math.floor(Math.random() * 1000000)
//     const date = new Date().getTime()
//     const evaluation = {
//       dimensions: {
//         'Gestures And Facial Expressions': Math.floor(Math.random() * 5 + 1),
//         'Pronounciation and Vocal Variety': Math.floor(Math.random() * 5 + 1),
//         'Comprehensibility and Structure': Math.floor(Math.random() * 5 + 1),
//         'Stylistic Devices': Math.floor(Math.random() * 5 + 1),
//         'Credible and Convincing': Math.floor(Math.random() * 5 + 1),
//       },
//       evaluator: { firstName: randomFirstName, lastName: randomLastName },
//       date: date,
//     }
//     speech.evaluations.push(evaluation)

//     await patchSpeech(speechNumber, speech)
//     const updatedSpeech = await getSpeeches(speechNumber)
//     const updatedEvaluation =
//       updatedSpeech.evaluations[updatedSpeech.evaluations.length - 1]

//     expect(updatedEvaluation.evaluator.firstName === randomFirstName).toBe(true)
//     expect(updatedEvaluation.evaluator.lastName === randomLastName).toBe(true)
//     expect(updatedEvaluation.date === date).toBe(true)
//   })
// })

// describe('patchSpeech', () => {
//   it.skip('delete all evaluations', async () => {
//     let speeches = await getSpeeches()
//     await speeches.forEach(speech => {
//       speech.evaluations = []
//       const id = speech.id
//       patchSpeech(id, speech)
//     })
//     speeches = await getSpeeches()

//     speeches.forEach(speech => {
//       expect(speech.evaluations.length).toBe(0)
//     })
//   })
// })
