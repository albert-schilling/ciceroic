const testUserData = {}
const testSpeechData = {}

for (let i = 0; i < 10; i++) {
  const id = Math.floor(Math.random() * 1000)
  Object.assign(testUserData, {
    [`users/${id}`]: { uid: id, email: `${id}@testing.de` },
  })
}
for (let i = 0; i < 10; i++) {
  const id = Math.floor(Math.random() * 1000)
  Object.assign(testSpeechData, {
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

function getTestUser() {
  const id = makeId(5)
  const testUser = {
    _id: id,
    uid: id,
    email: `testUser-${id}@ciceroic.com`,
    password: `testUser-${id}-password`,
    firstName: `testUser-${id}-firstName`,
    lastName: `testUser-${id}-lastName`,
    emailVerified: false,
    portrait: 'url-to-portrait',
  }

  return testUser

  function makeId(length) {
    let id = ''
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    for (let i = 0; i < length; i++) {
      id += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    return id
  }
}

export { getTestUser, testUserData, testSpeechData }
