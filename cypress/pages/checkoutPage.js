import { faker } from '@faker-js/faker';

export class CheckoutPage {
    verifyCheckoutPageDetails() {
      cy.get('.heading').first().should('have.text', 'Address Details');
      cy.get('.heading').last().should('have.text', 'Review Your Order');
    }
  
    fillPaymentDetails(user) {
      cy.get('.form-control').type(user.phoneNumber);
      cy.get('.btn-default.check_out').click();
      cy.get('[data-qa="name-on-card"]').type(faker.person.fullName());
      cy.get('[data-qa="card-number"]').type(faker.finance.creditCardNumber());
      cy.get('[data-qa="cvc"]').type(faker.finance.creditCardCVV());
      cy.get('[data-qa="expiry-month"]').type(12);
      cy.get('[data-qa="expiry-year"]').type(2035);
    }
  
    placeOrder() {
      cy.get('[data-qa="pay-button"]').click();
      cy.get('[data-qa="order-placed"]').should('be.visible');
    }
  }
  