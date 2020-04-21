import React from 'react'
import styled from 'styled-components/macro'
import PropTypes from 'prop-types'

export default function Comment({ header, content }) {
  return (
    <CommentBody>
      <CommentHeader>{header}</CommentHeader>
      <CommentContent>{content}</CommentContent>
    </CommentBody>
  )
}

Comment.propTypes = {
  header: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
}

const CommentBody = styled.section`
  display: grid;
  grid-gap: 8px;
  margin: 20px 0;
`

const CommentHeader = styled.h5`
  margin: 0;
  color: var(--secondary-font-color);
  font-size: 0.9rem;
  font-weight: inherit;
`
const CommentContent = styled.p`
  margin: 0;
  border: 1px solid var(--light-grey);
  border-radius: 4px;
  padding: 4px 8px;
  font-size: 0.9rem;
`
