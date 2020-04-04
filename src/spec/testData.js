const testData = {}

for (let i = 0; i < 10; i++) {
  const id = Math.floor(Math.random() * 1000)
  Object.assign(testData, {
    [`users/${id}`]: { uid: id, email: `${id}@testing.de` },
  })
}
console.log('testdata in testdata', testData)
export default testData
