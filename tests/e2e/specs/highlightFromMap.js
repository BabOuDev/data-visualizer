
describe('Highlight From Map', () => {
  before('Visits the app root url', () => {
    cy.visit('/');
  });

  it('Should highlight Rheba Pallaske from the map', () => {
    cy.get('.pin[title="Rheba Pallaske"]').click({force: true});
    cy.contains('#total-results', '1');
    cy.contains('table tr td', 'Rheba Pallaske');
  });

  it('Should reset highlight', () => {
    cy.get('#reset-highlighting').click();
    cy.contains('#total-results', '100');
  });

  it('Should highlight Roanne Woodvine from the map', () => {
    cy.get('.pin[title="Roanne Woodvine"]').click({force: true});
    cy.contains('#total-results', '1');
    cy.contains('table tr td', 'Roanne Woodvine');
  });
});
