import * as firebase from '@firebase/testing'
import fs from 'fs'
export { getTestDB, clearTestDB, firebase }

function getTestDB() {
  const projectId = `test-project-${Date.now()}`

  const app = firebase.initializeTestApp({
    projectId: projectId,
    auth: { uid: 'test-user', email: 'test-user@testing.com' },
  })

  firebase.loadFirestoreRules({
    projectId: projectId,
    rules: fs.readFileSync(
      '/Users/albertschilling/Projects/capstone-project/firestore.rules',
      'utf8'
    ),
  })

  return app
}

function clearTestDB() {
  firebase.apps().map(app => app.delete())
}
