import React from 'react'
import styled from 'styled-components/macro'

export default function SpeechStatistics({ speech }) {
  console.log('speech inside speechstatistics', speech)
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
                  Math.round(
                    (average[index].sum / average[index].count) * 100
                  ) / 100
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
        {!!speech.evaluations.length ? (
          <StatisticsList>
            {average.map(average => (
              <StatisticsListItem key={average.name}>
                {average.name}

                <StatisticsRangeValue>
                  <StatisticsRangeIndicator
                    style={{
                      marginLeft: `calc(${(average.average / 5) * 100}% - 8px)`,
                    }}
                  />
                  {average.average}
                </StatisticsRangeValue>
              </StatisticsListItem>
            ))}
            <p style={{ margin: 0, padding: '12px' }}>
              Total number of evaluations: {speech.evaluations.length}
            </p>
          </StatisticsList>
        ) : (
          <p>There are no evaluations yet.</p>
        )}
      </SpeechStatisticsContainer>
    </>
  )
}

const SpeechStatisticsContainer = styled.section`
  background: var(--light-grey);
  margin-bottom: 20px;
  @media (min-width: 700px) {
    max-width: 600px;
    align-self: center;
  }
`

const StatisticsList = styled.ul`
  margin: 0 0 20px 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  grid-gap: 8px;
`
const StatisticsListItem = styled.li`
  margin: 0;
  padding: 4px 12px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 8px;
  line-height: 1.4rem;
  :nth-child(odd) {
    background: #ddd;
  }
`

const StatisticsRangeValue = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  grid-gap: 8px;
`
const StatisticsRangeIndicator = styled.span`
  width: 12px;
  min-width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 1px solid #bbb;
  background: #fff;
`
