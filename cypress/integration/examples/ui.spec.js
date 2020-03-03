describe('UI journey', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  })

  it('gets the first video element and plays and pauses it', () => {
    cy.wait(2000)
      .get('video')
      .then(video => {
        const element = video.get(0)
        element.muted = true
        element.play()
        return video
      })
      .wait(5000)
      .get('video')
      .then(video => {
        const element = video.get(0)
        element.pause()
      })
  })
})
