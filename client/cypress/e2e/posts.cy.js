describe('Posts dashboard', () => {
  it('renders posts and creates a new one', () => {
    cy.intercept('GET', `${Cypress.env('apiUrl')}/posts*`, [
      { _id: '1', title: 'Existing', content: 'Lorem', category: 'general', createdAt: new Date().toISOString() }
    ]).as('getPosts');

    cy.intercept('POST', `${Cypress.env('apiUrl')}/auth/login`, {
      user: { username: 'cypress', email: 'cy@example.com' },
      token: 'token'
    }).as('login');

    cy.intercept('POST', `${Cypress.env('apiUrl')}/posts`, {
      _id: '2',
      title: 'New Post',
      content: 'Content',
      category: 'general'
    }).as('createPost');

    cy.visit('/');
    cy.wait('@getPosts');

    cy.findByLabelText(/email/i).type('cy@example.com');
    cy.findByLabelText(/password/i).type('password123');
    cy.findByRole('button', { name: /sign in/i }).click();
    cy.wait('@login');

    cy.findByLabelText(/title/i).type('New Post');
    cy.findByLabelText(/content/i).type('Integration content');
    cy.findByLabelText(/category/i).type('general');
    cy.findByRole('button', { name: /publish/i }).click();

    cy.wait('@createPost');
  });
});

