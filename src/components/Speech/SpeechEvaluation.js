import React from 'react'
import styled from 'styled-components/macro'

export default function SpeechEvaluation({ evaluation }) {
  const dimensions = Object.entries(evaluation.dimensions)
  const evaluationDate = new Date(evaluation.date)
  const date = `${new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(
    evaluationDate
  )}, ${evaluationDate.getDay()} ${new Intl.DateTimeFormat('en-US', {
    month: 'long',
  }).format(evaluationDate)}, ${evaluationDate.getFullYear()}`

  return (
    <SpeechStatisticsContainer>
      <p style={{ margin: 0, padding: '12px' }}>Your evaluation:</p>
      <StatisticsList>
        {dimensions.map(dimension => (
          <StatisticsListItem key={dimension[0]}>
            {dimension[0]}
            <StatisticsRangeValue>
              <StatisticsRangeIndicator
                style={{
                  marginLeft: `calc(${(dimension[1] / 5) * 100}% - 8px)`,
                }}
              />
              {dimension[1]}
            </StatisticsRangeValue>
          </StatisticsListItem>
        ))}
      </StatisticsList>
      <p style={{ margin: 0, padding: '12px' }}>From: {date}.</p>
    </SpeechStatisticsContainer>
  )
}

const SpeechStatisticsContainer = styled.section`
  background: var(--light-grey);
  margin-bottom: 20px;
  @media (min-width: 700px) {
    max-width: 600px;
    align-self: center;
  }
  p {
    line-height: 1.4rem;
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
