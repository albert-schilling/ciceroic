describe('Edit settings', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  })

  const email = 'cypress@ciceroic.com'
  const password = 'CypressCypress'
  const firstName = 'Cypress Master FirstName'
  const lastName = 'Cypress Master LastName'
  const about = 'Hi, I am Cypress and my purpose is to test this application.'

  it('log in user', () => {
    cy.wait(2000)
      .get('button[type=submit]')
      .click()
      .get('form')
      .contains('Please, enter your email address.')
      .focused()
      .type(email)
      .get('form')
      .submit()
      .get('form')
      .contains('Please, enter your password.')
      .focused()
      .type(password)
      .get('form')
      .submit()
      .wait(2000)
  })

  it('accesses user settings and changes the about text/bio text', () => {
    cy.wait(2000)
      .get('a[data-cy=profile]')
      .click()
      .get('button[data-cy=editAbout]')
      .click()
      .get('[data-cy=settings]')
      .contains('Done')
      .get('textarea[data-cy=inputAbout]')
      .clear()
      .type(about)
      .get('button[data-cy=updateAbout]')
      .click()
      .get('[data-cy=about]')
      .contains(about)
  })
  it('signs out', () => {
    cy.wait(2000)
      .get('a[data-cy=profile]')
      .click()
      .get('a[data-cy=signOut]')
      .click()
  })
})
