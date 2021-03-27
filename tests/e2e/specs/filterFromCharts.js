
describe('Filter from Charts', () => {
  before('Visits the app root url', () => {
    cy.visit('/');
  });

  it('Should filter from charts by Gender equal to Male', () => {
    cy.get('.pie-container [title^="Male"] .pie').click({force: true});
    cy.contains('#total-results', '50');
    cy.contains('.filter-label', 'Gender: Male');
  });

  it('Should filter from charts by Fav. Color equal to Red', () => {
    cy.get('.bar-container [title^="Red"].bar').click({force: true});
    cy.contains('#total-results', '9');
    cy.contains('.filter-label', 'Fav. Color: Red');
  });

  it('Should filter from charts by Fav. Fruit equal to Mango', () => {
    cy.get('.bar-container [title^="Mango"].bar').click({force: true});
    cy.contains('#total-results', '4');
    cy.contains('.filter-label', 'Fav. Fruit: Mango');
  });

  it('Should filter from charts by Fav. Pet equal to Cat', () => {
    cy.get('.pie-container [title^="Cat"] .pie').click({force: true});
    cy.contains('#total-results', '2');
    cy.contains('.filter-label', 'Fav. Pet: Cat');
  });

  it('Should reset all filters', () => {
    cy.get('.filter-form #reset-filters').click();
    cy.contains('#total-results', '100');
  });
});
