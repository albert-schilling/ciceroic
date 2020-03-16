import React from 'react'
import styled from 'styled-components/macro'

export default function Statistics({ dimensions }) {
  return (
    <StatisticsList>
      {console.log('dimensions', dimensions)}

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
  )
}

const StatisticsList = styled.ul`
  margin: 0 0 20px 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  grid-gap: 8px;
`
const StatisticsListItem = styled.li`
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 8px;
  font-size: 0.9rem;
  line-height: 1.2rem;
`

const StatisticsRangeValue = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  grid-gap: 8px;
  font-size: 0.9rem;
`
const StatisticsRangeIndicator = styled.span`
  width: 12px;
  min-width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 1px solid #bbb;
  background: #fff;
`
