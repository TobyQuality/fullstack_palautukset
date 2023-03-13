describe('Blog app', function() {

  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'user',
      username: 'user',
      password: 'user'
    }
    const anotherUser = {
      name: 'another',
      username: 'another',
      password: 'another'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.request('POST', 'http://localhost:3003/api/users/', anotherUser)
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

      cy.contains('user has logged in')
    })

    it('fails with wrong credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('wrong')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.contains('wrong credentials')
    })
  })

  describe('When logged in and blog created ', function() {
    beforeEach(function() {
      cy.get('#username').type('user')
      cy.get('#password').type('user')
      cy.get('#login-button').click()

      cy.contains('create new blog').click()
      cy.get('#title').type('title')
      cy.get('#author').type('author')
      cy.get('#url').type('url')
      cy.get('#create').click()

      cy.contains('a new blog title by author added')
    })

    it('A blog can be liked', function() {
      cy.contains('view').click()
      cy.contains('like').click()
      cy.contains('like').click()

      cy.contains('2').click()
    })

    it('Blog poster can delete own post', function() {
      cy.contains('logout').click()
      //Unfortunately in my code the user is not visible
      //immediately after posting a blog, but it will appear
      //in the blog after logging out and back in
      cy.get('#username').type('another')
      cy.get('#password').type('another')
      cy.get('#login-button').click()

      cy.contains('view').click()
      cy.contains('remove')
    })

    it('Only blog poster can see delete button', function() {
      cy.contains('logout').click()
      //Unfortunately in my code the user is not visible
      //immediately after posting a blog, but it will appear
      //in the blog after logging out and back in
      cy.get('#username').type('another')
      cy.get('#password').type('another')
      cy.get('#login-button').click()

      cy.contains('view').click()
      cy.get('html').should('not.contain', 'remove')
    })


    it('Blogs are arranged in the order of most likes', function() {
      cy.contains('create new blog').click()
      cy.get('#title').type('mostlikes')
      cy.get('#author').type('mostlikes')
      cy.get('#url').type('mostlikes')
      cy.get('#create').click()
      cy.get('#mostlikes').contains('view').click()
      cy.contains('like').click()
      cy.contains('like').click()
      cy.contains('like').click()
      cy.contains('hide').click()

      cy.contains('create new blog').click()
      cy.get('#title').type('onelike')
      cy.get('#author').type('onelike')
      cy.get('#url').type('onelike')
      cy.get('#create').click()
      cy.get('#onelike').contains('view').click()
      cy.contains('like').click()

      cy.get('.blog').eq(0).contains('mostlikes')
      cy.get('.blog').eq(1).contains('title')
      cy.get('.blog').eq(2).contains('onelike')
    })

  })

})