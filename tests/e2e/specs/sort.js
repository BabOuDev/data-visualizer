
describe('Sort', () => {
  before('Visits the app root url', () => {
    cy.visit('/');
  });

  it('Should sort by Name Ascending', () => {
    cy.contains('table thead th', 'Name').find('.sorting-caret').click();
    cy.contains('table tr td', 'Aggi Mourant');
  });

  it('Should sort by Name Descending', () => {
    cy.contains('table thead th', 'Name').find('.sorting-caret').click();
    cy.contains('table tr td', 'Zarah Stark');
  });

  it('Should sort by Gender Ascending', () => {
    cy.contains('table thead th', 'Gender').find('.sorting-caret').click();
    cy.contains('table tr td', 'Female');
  });

  it('Should sort by Gender Descending', () => {
    cy.contains('table thead th', 'Gender').find('.sorting-caret').click();
    cy.contains('table tr td', 'Male');
  });

  it('Should sort by Email Ascending', () => {
    cy.contains('table thead th', 'Email').find('.sorting-caret').click();
    cy.contains('table tr td', 'aexelby2g@howstuffworks.com');
  });

  it('Should sort by Email Descending', () => {
    cy.contains('table thead th', 'Email').find('.sorting-caret').click();
    cy.contains('table tr td', 'zstark23@rambler.ru');
  });

  it('Should sort by Phone Number Ascending', () => {
    cy.contains('table thead th', 'Phone Number').find('.sorting-caret').click();
    cy.contains('table tr td', '+1-213-769-0897');
  });

  it('Should sort by Phone Number Descending', () => {
    cy.contains('table thead th', 'Phone Number').find('.sorting-caret').click();
    cy.contains('table tr td', '+995-436-485-5952');
  });

  it('Should sort by Country Ascending', () => {
    cy.contains('table thead th', 'Country').find('.sorting-caret').click();
    cy.contains('table tr td', 'Argentina');
  });

  it('Should sort by Country Descending', () => {
    cy.contains('table thead th', 'Country').find('.sorting-caret').click();
    cy.contains('table tr td', 'Venezuela');
  });

  it('Should sort by Fav. Color Ascending', () => {
    cy.contains('table thead th', 'Fav. Color').find('.sorting-caret').click();
    cy.contains('table tr td', 'Blue');
  });

  it('Should sort by Fav. Color Descending', () => {
    cy.contains('table thead th', 'Fav. Color').find('.sorting-caret').click();
    cy.contains('table tr td', 'Yellow');
  });

  it('Should sort by Fav. Fruit Ascending', () => {
    cy.contains('table thead th', 'Fav. Fruit').find('.sorting-caret').click();
    cy.contains('table tr td', 'Apple');
  });

  it('Should sort by Fav. Fruit Descending', () => {
    cy.contains('table thead th', 'Fav. Fruit').find('.sorting-caret').click();
    cy.contains('table tr td', 'Strawberry');
  });

  it('Should sort by Fav. Movie Ascending', () => {
    cy.contains('table thead th', 'Fav. Movie').find('.sorting-caret').click();
    cy.contains('table tr td', '16 to Life');
  });

  it('Should sort by Fav. Movie Descending', () => {
    cy.contains('table thead th', 'Fav. Movie').find('.sorting-caret').click();
    cy.contains('table tr td', 'You\'re Next');
  });

  it('Should sort by Fav. Pet Ascending', () => {
    cy.contains('table thead th', 'Fav. Pet').find('.sorting-caret').click();
    cy.contains('table tr td', 'Bird');
  });

  it('Should sort by Fav. Pet Descending', () => {
    cy.contains('table thead th', 'Fav. Pet').find('.sorting-caret').click();
    cy.contains('table tr td', 'Rat');
  });
});
