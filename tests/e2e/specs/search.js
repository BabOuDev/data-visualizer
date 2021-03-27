
describe('Search', () => {
  beforeEach('Visits the app root url', () => {
    cy.visit('/');
  });

  it('Should search by firstname', () => {
    cy.get('#search').type('robinet');
    cy.get('table tbody').find('tr').should('have.length', 1);
    cy.contains('table tr td', 'Robinet Karran');
  });

  it('Should search by lastname', () => {
    cy.get('#search').type('karran');
    cy.get('table tbody').find('tr').should('have.length', 1);
    cy.contains('table tr td', 'Robinet Karran');
  });

  it('Should search by gender', () => {
    cy.get('#search').type('female');
    cy.get('table tbody').find('tr').should('have.length', 10);
    cy.contains('#total-results', '50');
    cy.contains('table tr td', 'Rheba Pallaske');
  });

  it('Should search by email', () => {
    cy.get('#search').type('rkarran1@angelfire.com');
    cy.get('table tbody').find('tr').should('have.length', 1);
    cy.contains('table tr td', 'Robinet Karran');
  });

  it('Search by phone', () => {
    cy.get('#search').type('51-661-694-8129');
    cy.get('table tbody').find('tr').should('have.length', 1);
    cy.contains('table tr td', 'Nerty Donnelly');
  });

  it('Should search by country', () => {
    cy.get('#search').type('jamaica');
    cy.get('table tbody').find('tr').should('have.length', 1);
    cy.contains('table tr td', 'Moore Buglar');
  });

  it('Should search by favorite color', () => {
    cy.get('#search').type('purple');
    cy.get('table tbody').find('tr').should('have.length', 10);
    cy.contains('#total-results', '17');
    cy.contains('table tr td', 'Reed Durant');
  });

  it('Should search by favorite fruit', () => {
    cy.get('#search').type('mango');
    cy.get('table tbody').find('tr').should('have.length', 10);
    cy.contains('#total-results', '23');
    cy.contains('table tr td', 'Robinet Karran');
  });

  it('Should search by favorite movie', () => {
    cy.get('#search').type('sharknado');
    cy.get('table tbody').find('tr').should('have.length', 1);
    cy.contains('table tr td', 'Sax Millican');
  });

  it('Should search by favorite pet', () => {
    cy.get('#search').type('cat');
    cy.get('table tbody').find('tr').should('have.length', 10);
    cy.contains('#total-results', '28');
    cy.contains('table tr td', 'Rheba Pallaske');
  });
});
