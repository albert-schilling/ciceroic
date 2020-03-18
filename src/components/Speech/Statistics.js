import React from 'react'
import styled from 'styled-components/macro'

export default function Statistics({ dimensions }) {
  return (
    <StatisticsList>
      {dimensions.map(dimension => (
        <StatisticsListItem key={dimension[0]}>
          {dimension[0]}
          <StatisticsRangeContainer>
            <StatisticsRangeFill
              style={{
                width: `calc(${(dimension[1] / 5) * 100}%)`,
                borderTopRightRadius: `${dimension[1] === 5 ? '10px' : 0}`,
                borderBottomRightRadius: `${dimension[1] === 5 ? '10px' : 0}`,
              }}
            />

            <StatisticsRangeNumber>{dimension[1]}</StatisticsRangeNumber>
          </StatisticsRangeContainer>
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

const StatisticsRangeContainer = styled.label`
  display: flex;
  align-items: center;
  justify-content: start;
  grid-gap: 8px;
  font-size: 0.9rem;
  border: 1px solid var(--primary-font-color);
  border-radius: 14px;
  height: 28px;
  padding: 2px;
  position: relative;
`
const StatisticsRangeFill = styled.span`
  height: 100%;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  border: transparent;
  background: var(--highlight-color);
`
const StatisticsRangeNumber = styled.span`
  position: absolute;
  left: calc(50% - 4px);
  color: var(--inverse-primary-font-color);
  mix-blend-mode: difference;
  line-height: 1.2rem;
`
