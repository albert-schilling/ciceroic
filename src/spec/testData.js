const testData = {}

for (let i = 0; i < 10; i++) {
  const id = Math.floor(Math.random() * 1000)
  Object.assign(testData, {
    [`users/${id}`]: { uid: id, email: `${id}@testing.de` },
  })
}
for (let i = 0; i < 2; i++) {
  const id = Math.floor(Math.random() * 1000)
  Object.assign(testData, {
    [`speeches/${id}`]: {
      _id: id,
      category: 'lecture',
      date: 1585595452083,
      description: `description-of-video-${id}`,
      fileUrl: `url-to-video-${id}`,
      filename: `filename-of-video-${id}`,
      speaker: `speaker-of-video-${id}`,
      status: `submitted`,
      title: `title-of-video-${id}`,
      userId: `${id}-${Math.floor(Math.random() * 1000)}`,
      uploadStatus: 'uploaded',
    },
  })
}

export default testData
