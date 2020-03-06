const baseUrl = 'http://localhost:3001/speeches/'

export function getSpeeches(id = '') {
  const request = fetch(baseUrl + id)
    .then(res => res.json())
    .catch(error => console.error(error))
  return request
}

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
