import { getVideos } from '../services/videoServices'

describe('getVideos', () => {
  it('returns an array', () => {
    expect(getVideos().then(res => Array.isArray(res))).resolves.toBe(true)
  })
})
