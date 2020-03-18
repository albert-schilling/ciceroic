import React from 'react'
import SpeechDescription from './SpeechDescription'

const sectionStyles = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  padding: '20px',
}

const speech = {
  title: 'This is what happens when you reply to spam email',
  speaker: 'James Veitch',
  description:
    'Suspicious emails: unclaimed insurance bonds, diamond-encrusted safe deposit boxes, close friends marooned in a foreign country. They pop up in our inboxes, and standard procedure is to delete on sight. But what happens when you reply? Follow along as writer and comedian James Veitch narrates a hilarious, months-long exchange with a spammer who offered to cut him in on a hot deal.',
  category: 'Lecture',
  duration: '9.48 min',
  date: 'Feb 1, 2016',
}

export default {
  title: 'Components/Speech/Speech',
  decorators: [storyFn => <section style={sectionStyles}>{storyFn()}</section>],
  component: SpeechDescription,
}

export const DefaultSpeechDescription = () => {
  return (
    <SpeechDescription
      title={speech.title}
      speaker={speech.speaker}
      description={speech.description}
      category={speech.category}
      duration={speech.duration}
      date={speech.date}
    />
  )
}
