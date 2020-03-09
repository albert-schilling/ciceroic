import React, { useRef } from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components/macro'

export default function SpeechStatistics() {
  // const speech = {
  //   id: '1',
  //   category: 'Lecture',
  //   title: 'How to speak so that people want to listen',
  //   speaker: 'Julian Treasure',
  //   description:
  //     "Have you ever felt like you're talking, but nobody is listening? Here's Julian Treasure to help you fix that. As the sound expert demonstrates some useful vocal exercises and shares tips on how to speak with empathy, he offers his vision for a sonorous world of listening and understanding.",
  //   date: 'Jun 27, 2014',
  //   duration: '9.58',
  //   filename:
  //     'How to speak so that people want to listen _ Julian Treasure.mp4',
  //   evaluations: [],
  // }
  const speech = {
    id: '1',
    category: 'Lecture',
    title: 'How to speak so that people want to listen',
    speaker: 'Julian Treasure',
    description:
      "Have you ever felt like you're talking, but nobody is listening? Here's Julian Treasure to help you fix that. As the sound expert demonstrates some useful vocal exercises and shares tips on how to speak with empathy, he offers his vision for a sonorous world of listening and understanding.",
    date: 'Jun 27, 2014',
    duration: '9.58',
    filename:
      'How to speak so that people want to listen _ Julian Treasure.mp4',
    evaluations: [
      {
        dimensions: {
          'Gestures And Facial Expressions': 4,
          'Pronounciation and Vocal Variety': 2,
          'Comprehensibility and Structure': 2,
          'Stylistic Devices': 2,
          'Credible and Convincing': 4,
        },
        evaluator: {
          firstName: 'TestNr468105',
          lastName: 'TestNr259065',
        },
        date: 1583697398446,
      },
      {
        dimensions: {
          'Gestures And Facial Expressions': 3,
          'Pronounciation and Vocal Variety': 1,
          'Comprehensibility and Structure': 5,
          'Stylistic Devices': 1,
          'Credible and Convincing': 1,
        },
        evaluator: {
          firstName: 'TestNr968224',
          lastName: 'TestNr113765',
        },
        date: 1583697434241,
      },
      {
        dimensions: {
          'Gestures And Facial Expressions': 4,
          'Pronounciation and Vocal Variety': 4,
          'Comprehensibility and Structure': 3,
          'Stylistic Devices': 1,
          'Credible and Convincing': 4,
        },
        evaluator: {
          firstName: 'TestNr138784',
          lastName: 'TestNr751496',
        },
        date: 1583697434350,
      },
      {
        dimensions: {
          'Gestures And Facial Expressions': 2,
          'Pronounciation and Vocal Variety': 3,
          'Comprehensibility and Structure': 1,
          'Stylistic Devices': 1,
          'Credible and Convincing': 4,
        },
        evaluator: {
          firstName: 'TestNr266933',
          lastName: 'TestNr18944',
        },
        date: 1583697454062,
      },
      {
        dimensions: {
          'Gestures And Facial Expressions': 5,
          'Pronounciation and Vocal Variety': 1,
          'Comprehensibility and Structure': 3,
          'Stylistic Devices': 3,
          'Credible and Convincing': 2,
        },
        evaluator: {
          firstName: 'TestNr508415',
          lastName: 'TestNr213347',
        },
        date: 1583697479512,
      },
    ],
  }

  let average
  !!speech.evaluations.length
    ? (average = speech.evaluations.reduce((average, evaluation) => {
        Object.entries(evaluation.dimensions).forEach(dimension => {
          const index = average.findIndex(
            dimensionAverage => dimensionAverage.name === dimension[0]
          )
          index >= 0
            ? (() => {
                average[index].sum += dimension[1]
                average[index].count++
                average[index].average =
                  average[index].sum / average[index].count
              })()
            : average.push({
                name: dimension[0],
                sum: dimension[1],
                count: 1,
                average: dimension[1],
              })
        })
        return average
      }, []))
    : (average = [])

  return (
    <>
      <SpeechStatisticsContainer>
        <h4>Statistics</h4>
        {!!speech.evaluations.length ? (
          <StatisticsList>
            {average.map(average => (
              <StatisticsListItem key={average.name}>
                <span>{average.name}</span>

                <StatisticsRangeValue
                  style={{ marginLeft: `${(average.average / 5) * 100}%` }}
                >
                  <StatisticsRangeButton />
                  {average.average}
                </StatisticsRangeValue>
              </StatisticsListItem>
            ))}
            <p>Total number of evaluations: {speech.evaluations.length}</p>
          </StatisticsList>
        ) : (
          <p>There are no evaluations yet.</p>
        )}
      </SpeechStatisticsContainer>
    </>
  )
}

const SpeechStatisticsContainer = styled.section`
  background: #eee;
`

const StatisticsList = styled.ul`
  display: flex;
  flex-direction: column;
  grid-gap: 8px;
`
const StatisticsListItem = styled.li`
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-gap: 8px;
`

const StatisticsRangeValue = styled.label`
  width: fit-content;
  display: flex;
  grid-gap: 8px;
`
const StatisticsRangeButton = styled.button`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 1px solid #bbb;
  background: #fff;
`
