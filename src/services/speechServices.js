const baseUrl = 'http://localhost:3001/speeches/'
import { cardsRef } from '../firebase'

export function getSpeeches(id = '') {
  const request = fetch(baseUrl + id)
    .then(res => res.json())
    .catch(error => console.error(error))
  return request
}

// export function getCards() {
//   return fetchCards()
// }
// function fetchCards() {
//   return cardsRef.get()
//     .then(querySnapshot => {
//       let cardsData = []
//       querySnapshot.forEach(doc => {
//         cardsData.push(doc.data())
//       })

//       return cardsData
//     })
// }

export function patchSpeech(id = '', data) {
  const request = fetch(baseUrl + id, {
    method: 'PATCH',
    body: JSON.stringify(data),
    headers: {
      'content-type': 'application/json',
    },
  })
    .then(res => res.json())
    .catch(error => console.error(error))
  return request
}
