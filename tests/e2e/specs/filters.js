
describe('Filters', () => {
  before('Visits the app root url', () => {
    cy.visit('/');
  });

  it('Should enable filtering', () => {
    cy.get('.filter-switch').click();
    cy.get('.filter-form');
  });

  it('Should filter by Gender equal to Male', () => {
    cy.get('.filter-form #column').select('Gender');
    cy.get('.filter-form #value').select('Male');
    cy.get('.filter-form #apply-filters').click();
    cy.contains('#total-results', '50');
    cy.contains('.filter-label', 'Gender: Male');
  });

  it('Should filter by Fav. Color equal to Red or Blue', () => {
    cy.get('.filter-form #column').select('Fav. Color');
    cy.get('.filter-form #value').select('Red');
    cy.get('.filter-form #apply-filters').click();
    cy.contains('#total-results', '9');

    cy.get('.filter-form #value').select('Blue');
    cy.get('.filter-form #apply-filters').click();
    cy.contains('#total-results', '19');
    cy.contains('.filter-label', 'Fav. Color: Red or Blue');
  });

  it('Should filter by Fav. Fruit equal to Apple or Pineapple', () => {
    cy.get('.filter-form #column').select('Fav. Fruit');
    cy.get('.filter-form #value').select('Apple');
    cy.get('.filter-form #apply-filters').click();
    cy.contains('#total-results', '2');

    cy.get('.filter-form #value').select('Pineapple');
    cy.get('.filter-form #apply-filters').click();
    cy.contains('#total-results', '4');
    cy.contains('.filter-label', 'Fav. Fruit: Apple or Pineapple');
  });

  it('Should filter by Fav. Pet equal to Dog', () => {
    cy.get('.filter-form #column').select('Fav. Pet');
    cy.get('.filter-form #value').select('Dog');
    cy.get('.filter-form #apply-filters').click();
    cy.contains('#total-results', '1');
    cy.contains('.filter-label', 'Fav. Pet: Dog');
  });

  it('Should remove the filter Gender equal to Male', () => {
    cy.contains('.filter-label', 'Gender: Male').find('.remove-button').click({force: true});
    cy.contains('#total-results', '3');
  });

  it('Should remove the filter Fav. Color equal to Red or Blue', () => {
    cy.contains('.filter-label', 'Fav. Color: Red or Blue').find('.remove-button').click({force: true});
    cy.contains('#total-results', '8');
  });

  it('Should reset all filters', () => {
    cy.get('.filter-form #reset-filters').click();
    cy.contains('#total-results', '100');
  });
});
