const baseUrl = 'http://localhost:3001/videos/'

export function getVideos(id = '') {
  const request = fetch(baseUrl + id)
    .then(res => res.json())
    .catch(error => console.error(error))
  return request
}

export function patchVideo(id = '', data) {
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
