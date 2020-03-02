const baseUrl = 'http://localhost:3001/videos/'

export function getVideos() {
  const request = fetch(baseUrl)
    .then(res => res.json())
    .catch(error => console.error(error))
  return request
}
