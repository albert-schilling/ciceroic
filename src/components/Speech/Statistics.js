import React from 'react'
import styled from 'styled-components/macro'

export default function Statistics({ dimensions }) {
  return (
    <StatisticsList>
      {dimensions.map(dimension => (
        <StatisticsListItem key={dimension.name}>
          {dimension.name}
          <StatisticsRangeContainer>
            <StatisticsRangeFill dimensionValue={dimension.value} />
            <StatisticsRangeNumber>{dimension.value}</StatisticsRangeNumber>
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
  border-top-right-radius: ${props =>
    props.dimensionValue === 5 ? '10px' : 0};
  border-bottom-right-radius: ${props =>
    props.dimensionValue === 5 ? '10px' : 0};
  width: ${props => `calc((${props.dimensionValue} / 5) * 100%)`};
`
const StatisticsRangeNumber = styled.span`
  position: absolute;
  left: calc(50% - 4px);
  color: var(--inverse-primary-font-color);
  mix-blend-mode: difference;
  line-height: 1.2rem;
`
