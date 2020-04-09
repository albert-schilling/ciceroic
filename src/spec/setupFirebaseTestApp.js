import * as firebase from '@firebase/testing'
import fs from 'fs'
export { getTestDB, clearTestDB, firebase }

async function getTestDB(auth, data) {
  const projectId = `test-project-${Date.now()}`

  const app = await firebase.initializeTestApp({
    projectId,
    auth,
  })

  const db = app.firestore()

  // write mock data before rules
  if (data) {
    for (const key in data) {
      const ref = db.doc(key)
      await ref.set(data[key])
    }
  }

  // apply rules
  firebase.loadFirestoreRules({
    projectId,
    rules: fs.readFileSync(
      '/Users/albertschilling/Projects/capstone-project/firestore.rules',
      'utf8'
    ),
  })

  return db
}

function clearTestDB() {
  Promise.all(firebase.apps().map(app => app.delete()))
}

// add custom matchers

expect.extend({
  async toAllow(x) {
    let pass = false
    try {
      await firebase.assertSucceeds(x)
      pass = true
    } catch (error) {
      console.error(error)
    }
    return {
      pass,
      message: () =>
        'Expected firebase operation to be allowed, but it failed.',
    }
  },
})

expect.extend({
  async toDeny(x) {
    let pass = false
    try {
      await firebase.assertFails(x)
      pass = true
    } catch (error) {
      console.error(error)
    }
    return {
      pass,
      message: () =>
        'Expected firebase operation to be denied, but it was allowed.',
    }
  },
})
