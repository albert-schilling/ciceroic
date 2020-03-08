import { getSpeeches } from '../services/speechServices'

describe('getSpeeches', () => {
  it('returns an array', () => {
    expect(getSpeeches().then(res => Array.isArray(res))).resolves.toBe(true)
  })
})
