import { cleanup } from '@testing-library/react'
import useSpeech from './useSpeech'
import renderCustomHook from '../spec/renderCustomHook'

afterEach(cleanup)

describe('capitalizeString', () => {
  const { capitalizeString } = renderCustomHook(useSpeech)

  it('returns a string with the first letter capitalized', () => {
    const string = 'comedy'
    const capitalized = capitalizeString(string)
    expect(capitalized.charAt(0)).toEqual(string.charAt(0).toUpperCase())
  })
  it('returns an empty string if an empty string given', () => {
    const string = ''
    const capitalized = capitalizeString(string)
    expect(capitalized.length).toEqual(0)
    expect(capitalized).toEqual('')
  })
})

describe('returnCategories', () => {
  const { returnCategories } = renderCustomHook(useSpeech)

  it('returns an array with unique values according to the categories present in the given array', () => {
    const speeches = [
      { name: 3, category: 'lecture' },
      { name: 1, category: 'comedy' },
      { name: 2, category: 'pitch' },
      { name: 4, category: 'pitch' },
      { name: 5, category: 'pitch' },
    ]
    expect(speeches.length).toEqual(5)
    const categories = returnCategories(speeches)
    expect(categories.length).toEqual(3)
    expect(categories.includes('lecture')).toBe(true)
    expect(categories.includes('comedy')).toBe(true)
    expect(categories.includes('pitch')).toBe(true)
    expect(categories.includes('bullocks')).toBe(false)
  })

  it('returns an empty array if no categories found', () => {
    const speeches = [
      { name: 3 },
      { name: 1 },
      { name: 2 },
      { name: 4 },
      { name: 5 },
    ]
    expect(speeches.length).toEqual(5)
    const categories = returnCategories(speeches)
    expect(categories.length).toEqual(0)
    expect(categories.includes('lecture')).toBe(false)
  })
  it('returns empty array if empty array given', () => {
    const emptyArray = []
    expect(emptyArray.length).toEqual(0)
    const returnedArray = returnCategories(emptyArray)
    expect(returnedArray.length).toEqual(0)
    expect(returnedArray.length).toEqual(emptyArray.length)
    expect(returnedArray).toEqual(emptyArray)
  })
})

describe('sortAccordingToDate', () => {
  const { sortAccordingToDate } = renderCustomHook(useSpeech)

  it('sorts speeches according to their date (Date.now()) of submitting', () => {
    const speeches = [
      { name: 3, date: 10 },
      { name: 1, date: 19 },
      { name: 2, date: 12 },
    ]
    expect(speeches.length).toEqual(3)
    const sortedSpeeches = sortAccordingToDate(speeches)
    expect(sortedSpeeches[0].name).toEqual(1)
  })

  it('returns empty array if empty array given', () => {
    const emptyArray = []
    expect(emptyArray.length).toEqual(0)
    const returnedArray = sortAccordingToDate(emptyArray)
    expect(returnedArray.length).toEqual(0)
    expect(returnedArray.length).toEqual(emptyArray.length)
    expect(returnedArray).toEqual(emptyArray)
  })
})

describe('sortAccordingToEvaluations', () => {
  const { sortAccordingToEvaluations } = renderCustomHook(useSpeech)

  it('sorts speeches according to their amount of evaluations', () => {
    const speeches = [
      { name: 3, evaluations: [1, 2, 3, 4] },
      { name: 1 },
      { name: 2, evaluations: [1, 2] },
    ]
    expect(speeches.length).toEqual(3)
    const sortedSpeeches = sortAccordingToEvaluations(speeches)
    expect(sortedSpeeches[0].name).toEqual(1)
  })
  it('sorts speeches according to their amount of evaluations correctly, even if these are equivalent', () => {
    const speeches = [
      { name: 3, evaluations: [1, 2, 3, 4] },
      { name: 4, evaluations: [1, 2, 3, 4] },
      { name: 1, evaluations: [1, 2] },
      { name: 2, evaluations: [1, 2] },
    ]
    expect(speeches.length).toEqual(4)
    const sortedSpeeches = sortAccordingToEvaluations(speeches)
    expect(sortedSpeeches[0].name === 1 || sortedSpeeches[0].name === 2).toBe(
      true
    )
    expect(sortedSpeeches[1].name === 1 || sortedSpeeches[1].name === 2).toBe(
      true
    )
  })
  it('returns empty array if empty array given', () => {
    const emptyArray = []
    expect(emptyArray.length).toEqual(0)
    const returnedArray = sortAccordingToEvaluations(emptyArray)
    expect(returnedArray.length).toEqual(0)
    expect(returnedArray.length).toEqual(emptyArray.length)
    expect(returnedArray).toEqual(emptyArray)
  })
})

describe.only('shortenArray', () => {
  const { shortenArray } = renderCustomHook(useSpeech)

  it('tests if array gets shortened correctly', () => {
    const longArray = new Array(5)
    expect(longArray.length).toEqual(5)
    const newLength = 3
    const shortenedArray = shortenArray(longArray, newLength)
    expect(shortenedArray.length).toEqual(3)
  })
  it('tests if empty array gets returned as an empty array', () => {
    const emptyArray = []
    expect(emptyArray.length).toEqual(0)
    const newLength = 3
    const shortenedArray = shortenArray(emptyArray, newLength)
    expect(shortenedArray.length).toEqual(0)
  })
  it('tests if an array shorter than the required length stays the same', () => {
    const shortArray = [Math.random(), Math.random(), Math.random()]
    expect(shortArray.length).toEqual(3)
    const newLength = 5
    const shortenedArray = shortenArray(shortArray, newLength)
    expect(shortenedArray.length).toEqual(shortArray.length)
    expect(shortenedArray).toEqual(shortArray)
  })
  it('tests if the same array gets returned if the required length is < 0', () => {
    const shortArray = [Math.random(), Math.random(), Math.random()]
    expect(shortArray.length).toEqual(3)
    const falseLength = -2
    const sameArray = shortenArray(shortArray, falseLength)
    expect(sameArray.length).toEqual(shortArray.length)
    expect(sameArray).toEqual(shortArray)
  })
  it('tests if an empty array gets returned if the required length is 0', () => {
    const shortArray = [Math.random(), Math.random(), Math.random()]
    expect(shortArray.length).toEqual(3)
    const zeroLength = 0
    const emptyArray = shortenArray(shortArray, zeroLength)
    expect(emptyArray.length).toEqual(0)
    expect(emptyArray).toEqual([])
  })
  it.only('tests if an error gets returned if the arguments given are not of the correct type', () => {
    const object = {}
    const length = 'two'
    const response = shortenArray(object, length)
    expect(typeof response).toEqual(typeof new TypeError())
  })
})
