
describe('Pagination', () => {
  before('Visits the app root url', () => {
    cy.visit('/');
  });

  it('Should have a list of 10 items by default', () => {
    cy.contains('table tr td', 'Rheba Pallaske');
    cy.contains('table tr td', 'Rochell Rudgley');
    cy.get('table tbody').find('tr').should('have.length', 10);
    cy.contains('.pagination-summary', 'Rows 1 to 10 of 100');
    cy.contains('.pagination li.current', '1');
  });

  it('Should go to page 2', () => {
    cy.contains('.pagination li:not(.hidden)', '2').click();
    cy.contains('table tr td', 'Lara Cheek');
    cy.contains('table tr td', 'Tab Sinton');
    cy.get('table tbody').find('tr').should('have.length', 10);
    cy.contains('.pagination-summary', 'Rows 11 to 20 of 100');
    cy.contains('.pagination li.current', '2');
  });

  it('Should go to last page', () => {
    cy.contains('.pagination li:not(.hidden)', '>>').click();
    cy.contains('table tr td', 'Dmitri Pauling');
    cy.contains('table tr td', 'Roanne Woodvine');
    cy.get('table tbody').find('tr').should('have.length', 10);
    cy.contains('.pagination-summary', 'Rows 91 to 100 of 100');
    cy.contains('.pagination li.current', '10');
  });

  it('Should go back to first page', () => {
    cy.contains('.pagination li:not(.hidden)', '<<').click();
    cy.contains('table tr td', 'Rheba Pallaske');
    cy.contains('table tr td', 'Rochell Rudgley');
    cy.get('table tbody').find('tr').should('have.length', 10);
    cy.contains('.pagination-summary', 'Rows 1 to 10 of 100');
    cy.contains('.pagination li.current', '1');
  });

  it('Should update the list size to 25 items', () => {
    cy.get('.items-by-page select').select('25');
    cy.contains('table tr td', 'Rheba Pallaske');
    cy.contains('table tr td', 'Tamarah McIlmorow');
    cy.get('table tbody').find('tr').should('have.length', 25);
    cy.contains('.pagination-summary', 'Rows 1 to 25 of 100');
  });

  it('Should update the list size to 50 items', () => {
    cy.get('.items-by-page select').select('50');
    cy.contains('table tr td', 'Rheba Pallaske');
    cy.contains('table tr td', 'Wye Mallord');
    cy.get('table tbody').find('tr').should('have.length', 50);
    cy.contains('.pagination-summary', 'Rows 1 to 50 of 100');
  });

  it('Should update the list size to 100 items', () => {
    cy.get('.items-by-page select').select('100');
    cy.contains('table tr td', 'Rheba Pallaske');
    cy.contains('table tr td', 'Roanne Woodvine');
    cy.get('table tbody').find('tr').should('have.length', 100);
    cy.contains('.pagination-summary', 'Rows 1 to 100 of 100');
  });
});
