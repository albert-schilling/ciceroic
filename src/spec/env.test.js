// unit tests for env file
// require('dotenv').config({ path: __dirname + '../../.env.test' })

describe('env', () => {
  it('should have a React App Api Key', () => {
    expect(process.env.REACT_APP_API_KEY).toBeDefined()
  })
  it('should have a React App Auth Domain', () => {
    expect(process.env.REACT_APP_AUTH_DOMAIN).toBeDefined()
  })
  it('should have a React App Database URL', () => {
    expect(process.env.REACT_APP_DATABASE_URL).toBeDefined()
  })
  it('should have a React App Project ID', () => {
    expect(process.env.REACT_APP_PROJECT_ID).toBeDefined()
  })
  it('Project ID should be ciceroic-test', () => {
    expect(process.env.REACT_APP_PROJECT_ID).toEqual('ciceroic-test')
  })
  it('Project ID should not be ciceroic', () => {
    expect(process.env.REACT_APP_PROJECT_ID).not.toEqual('ciceroic')
  })

  it('should have a React App Storage Bucket', () => {
    expect(process.env.REACT_APP_STORAGE_BUCKET).toBeDefined()
  })
  it('should have a React App Messaging Sender Id', () => {
    expect(process.env.REACT_APP_MESSAGING_SENDER_ID).toBeDefined()
  })
  it('should have a React App App id', () => {
    expect(process.env.REACT_APP_APP_ID).toBeDefined()
  })
  it('should have a React App Measurement id', () => {
    expect(process.env.REACT_APP_MEASUREMENT_ID).toBeDefined()
  })
})
