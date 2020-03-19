import React from 'react'
import styled from 'styled-components/macro'
import Statistics from './Statistics'
import useSpeech from '../../hooks/useSpeech'

export default function SpeechStatistics({ speech }) {
  const {
    calculateAverageEvaluation,
    returnDimensionsFromAverage,
  } = useSpeech()
  const average = calculateAverageEvaluation(speech)
  const averageDimensions = returnDimensionsFromAverage(average)

  return (
    <>
      <SpeechStatisticsContainer>
        {speech.evaluations ? (
          <>
            <Statistics dimensions={averageDimensions} />

            <StatisticsLegend>
              Total number of evaluations: {speech.evaluations.length}
            </StatisticsLegend>
          </>
        ) : (
          <p>There are no evaluations yet.</p>
        )}
      </SpeechStatisticsContainer>
    </>
  )
}

const SpeechStatisticsContainer = styled.section`
  margin-bottom: 20px;
  border: 1px solid var(--light-grey);
  border-radius: 4px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media (min-width: 700px) {
    max-width: 600px;
    align-self: center;
  }
  p {
    line-height: 1.4rem;
  }
`

const StatisticsLegend = styled.p`
  margin: 0;
  color: var(--secondary-font-color);
  font-size: 0.9rem;
`
