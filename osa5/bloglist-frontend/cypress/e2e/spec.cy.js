describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'user',
      username: 'user',
      password: 'user'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('login')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('user')
      cy.get('#password').type('user')
      cy.get('#login-button').click()

      cy.contains('user logged in')
    })

    it('fails with wrong credentials', function() {
      // ...
    })
  })

})