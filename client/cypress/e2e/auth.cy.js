describe('Authentication Flow', () => {
  it('allows a user to login', () => {
    cy.intercept('POST', `${Cypress.env('apiUrl')}/auth/login`, {
      user: { username: 'cypress', email: 'cy@example.com' },
      token: 'token'
    }).as('login');

    cy.visit('/');
    cy.findByLabelText(/email/i).type('cy@example.com');
    cy.findByLabelText(/password/i).type('password123');
    cy.findByRole('button', { name: /sign in/i }).click();

    cy.wait('@login');
    cy.contains(/welcome, cypress/i).should('exist');
  });
});

