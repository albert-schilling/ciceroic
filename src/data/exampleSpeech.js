const exampleSpeech = {
  _id: 'speechxyz',
  title: 'Ciceroic – React Web App',
  category: 'lecture',
  date: 1585595452083,
  description:
    'From January until March 2020, I studied web development at the "neuefische" bootcamp in Hamburg. I built Ciceroic with React and Google Firebase as my final project.',
  duration: '1.5',
  speaker: 'Speaker XYZ',
  userId: 'speakerxyz',
  fileUrl: '/videos/test-video.mp4',
  status: 'submitted',
  uploadStatus: 'uploaded',
  evaluations: [
    {
      date: 1586252746667,
      dimensions: {
        'Comprehensibility and Structure': 5,
        'Credible and Convincing': 4,
        'Gestures And Facial Expressions': 5,
        'Pronounciation and Vocal Variety': 3,
        'Stylistic Devices': 5,
      },

      evaluator: {
        firstName: 'Evaluator FirstName',
        id: 'evaluatorxyz',
        lastName: 'Evaluator LastName',
      },
      praise: 'Great speech!',
      suggestions: 'Not much to improve',
      upvotes: [
        {
          date: 1586252889332,
          firstName: 'Speaker FirstName',
          id: 'speakerxyz',
          lastName: 'Speaker LastName',
        },
      ],
    },
  ],
}

export default exampleSpeech
