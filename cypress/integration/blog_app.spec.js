describe('Blog app', function(){
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Shvidsara Blues Experiment',
      username: 'shvidsara',
      password: 'shvid'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function(){
    cy.contains('login')
  })
  describe('Login', function(){

    it('Succeeds with correct credentials', function(){
      cy.get('#login-username').type('shvidsara')
      cy.get('#login-password').type('shvid')
      cy.get('#login-button').click()

      cy.contains('shvidsara is logged in')
    })

    it('Fails with wrong credentials', function(){
      cy.get('#login-username').type('shvidsara')
      cy.get('#login-password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'Invalid credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')
    })
  })

  describe('When logged in', function(){
    beforeEach(function() {
      cy.login({ username: 'shvidsara', password: 'shvid' })
    })
    it('New Blog can be created', function(){
      cy.contains('Post a new blog').click()
      cy.get('input#author').type('first author')
      cy.get('input#title').type('first title')
      cy.get('input#url').type('first url')
      cy.contains('add').click()

      cy.contains('first author')
      cy.contains('first title')
      cy.should('not.contain', 'first url')

      cy.contains('first author').parent().parent().contains('view').click()
      cy.contains('first url')
    })

    describe('And multiple blogs are present', function(){
      beforeEach(function() {
        cy.createBlog({ title: 'firstBlogTitle', author: 'firstBlogAuthor', url: 'firstBlogUrl', likes:1 })
        cy.createBlog({ title: 'secondBlogTitle', author: 'secondBlogAuthor', url: 'secondBlogUrl', likes:2 })
        cy.createBlog({ title: 'thirdBlogTitle', author: 'thirdBlogAuthor', url: 'thirdBlogUrl', likes:3 })
      })

      it('User can like blogs', function(){
        cy.get('.blogDiv').each((each) => cy.wrap(each).contains('view').click())
        cy.get('.blogDiv').each((each) => cy.wrap(each).find('button').contains('Like').click({ multiple: false }))
      })

      it.only('Blogs are sorted in a descending order of likes', function(){
        cy.get('.blogDiv').each((each) => cy.wrap(each).contains('view').click())
        cy.get('.howManyLikes').then(likes => {
          for(let i = 1; i < likes.length; i++){
            const currLikes = likes[i].innerHTML.substring(7)
            const prevLikes = likes[i - 1].innerHTML.substring(7)
            cy.wrap(parseInt(currLikes)).then(parseFloat).should('be.lt', parseInt(prevLikes))
          }
        })
      })

      it('User can delete a blog that he created', function(){
        cy.contains('firstBlogAuthor').parent().parent().as('theParent')
        cy.get('@theParent').contains('view').click()
        cy.get('@theParent').contains('Delete').click()

        cy.should('not.contain', 'firstBlogAuthor')
      })

      it('User can\'t delete other User\'s blog', function(){
        const user = {
          name: 'Shvidsara Blues Experiment',
          username: 'rvasara',
          password: 'rvarva'
        }
        cy.request('POST', 'http://localhost:3001/api/users/', user)
        cy.login({ username: 'rvasara', password: 'rvarva' })

        cy.contains('secondBlogAuthor').parent().parent().as('theParent')
        cy.get('@theParent').contains('view').click()
        cy.get('@theParent').contains('Delete').click()
        cy.get('.error')
      })

    })
  })
})