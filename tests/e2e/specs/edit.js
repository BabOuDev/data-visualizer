
describe('Edit', () => {
  before('Visits the app root url', () => {
    cy.visit('/');
  });

  it('Should open the side panel for Rheba Pallaske', () => {
    cy.contains('table tr', 'Rheba Pallaske').click();
  });

  it('Should fill the fields', () => {
    cy.get('.side-panel [name="Firstname"]').clear().type('MyFirstname');
    cy.get('.side-panel [name="Lastname"]').clear().type('MyLastname');
    cy.get('.side-panel [name="Gender"]').select('Male');
    cy.get('.side-panel [name="Email"]').clear().type('this-is@my.mail');
    cy.get('.side-panel [name="Phone Number"]').clear().type('+12-34-56-78-90');
    cy.get('.side-panel [name="Country"]').clear().type('My Country');
    cy.get('.side-panel [name="Fav. Color"]').select('Blue');
    cy.get('.side-panel [name="Fav. Fruit"]').select('Mango');
    cy.get('.side-panel [name="Fav. Movie"]').clear().type('My Favorite Movie');
    cy.get('.side-panel [name="Fav. Pet"]').select('Dog');
    cy.get('.side-panel [name="Address"]').clear().type('My Address');
    cy.get('.side-panel [name="City"]').clear().type('My City');
    cy.get('.side-panel [name="Longitude"]').clear().type('0');
    cy.get('.side-panel [name="Latitude"]').clear().type('0');
  });

  it('Should save the changes', () => {
    cy.get('#save-button').click();
    cy.contains('table tr', 'MyFirstname MyLastname');
  });
});
