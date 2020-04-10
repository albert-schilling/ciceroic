describe('UI journey', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  })

  function makeid(length) {
    let result = ''
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    return result
  }

  const id = makeid(5)
  const name = `Cypress-${id}`

  it.only('signs up a new user', () => {
    cy.wait(2000)
      .get('button[type=submit]')
      .click()
      .get('form')
      .contains('Please, enter your email address.')
      .focused()
      .type(`${name}@ciceroic.com`)
      .get('button[type=submit]')
      .click()
      .get('form')
      .contains('Please, enter your password.')
      .focused()
      .type('Cypress')
      .get('button[type=submit]')
      .click()
      .get('form')
      .contains(
        'Sorry, this email has not been found. If you are a new user, please, click the "Sign Up"-button to register.'
      )
      .get('a[name=signUp]')
      .click()
      .get('button[type=submit]')
      .click()
      .get('form')
      .contains('Please, enter a valid password with at least 8 characters.')
      .focused()
      .type('Cypress')
      .get('button[type=submit]')
      .click()
      .get('form')
      .contains('Please, enter your first name.')
      .focused()
      .type(name)
      .get('button[type=submit]')
      .click()
      .get('form')
      .contains('Please, enter your last name.')
      .focused()
      .type(name)
      .get('button[type=submit]')
    // .click()
  })
})
