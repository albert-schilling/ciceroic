describe('Sign up and delete user', () => {
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
  const about = 'Hi, I am Cypress and my purpose is to test this application.'

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
      .click()
      .get('form')
      .contains(
        'You have to agree to the terms of use and the privacy policy to join Ciceroic.'
      )
      .focused()
      .click()
      .get('form')
      .submit()
      .wait(4000)
  })
  it.only('deletes profile and returns to the landing page', () => {
    cy.wait(4000)
      .get('a[data-cy=profile]')
      .click()
      .get('[data-cy=settings]')
      .contains('Delete Profile')
      .click()
      .get('[data-cy=settings]')
      .contains('Are you sure?')
      .get('[data-cy=settings]')
      .contains('Delete Profile')
      .click()
      .wait(2000)
      .get('main')
      .contains('Become a great speaker like Cicero')
      .get('main')
      .contains('Sign Up')
  })
})
