import { getVideos } from './videoServices'

describe('getVideos', () => {
  it('receives an array', () => {
    expect(getVideos().then(res => Array.isArray(res))).resolves.toBeTruthy()
    // expect(typeof {value: 'value'}).toBe('object');
  })
})
