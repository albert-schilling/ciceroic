const baseUrl = 'http://localhost:3001/videos/'

export function getVideos(id = '') {
  const request = fetch(baseUrl + id)
    .then(res => res.json())
    .catch(error => console.error(error))
  return request
}
