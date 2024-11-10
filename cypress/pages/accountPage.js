export class AccountPage {
    deleteAccount() {
      cy.get('[href *="delete"]').click();
    }
  
    verifyAccountDeleted() {
      cy.get('b').should('contain', 'Account Deleted!');
      cy.get('[data-qa="continue-button"]').click();
    }
  }