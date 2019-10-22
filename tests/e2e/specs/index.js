// https://docs.cypress.io/api/introduction/api.html

describe('Global Feeds', () => {
  it('Visits the app root url', () => {
    cy.visit('/');
    cy.contains('h1', 'conduit');
  });
  it('should contain global feed', () => {
    cy.visit('/');
    cy.get('.router-link-exact-active').contains('Global Feed');
  });
  it('should contain popular tags', () => {
    cy.visit('/');
    cy.get('.sidebar').contains('Popular Tags');
  });
  
});
