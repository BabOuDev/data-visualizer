
describe('Edit', () => {
  before('Visits the app root url', () => {
    cy.visit('/');
  });

  it('Should export data', () => {
    cy.get('#export').click();
    cy.get('#downloadAnchorElem').invoke('attr', 'href').should('contain', 'data:text/json;charset=utf-8');
  });
});
