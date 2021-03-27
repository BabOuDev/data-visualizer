
describe('Data', () => {
  beforeEach('Visits the app root url', () => {
    cy.visit('/');
  });

  it('Should checks data presence', () => {
    cy.contains('table tr td', 'Rheba Pallaske');
    cy.contains('table tr td', 'Rochell Rudgley');
    cy.contains('.pagination-summary', ' 100');
    cy.get('table tbody').find('tr').should('have.length', 10);
  });
});
