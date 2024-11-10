export class CartPage {
    addItemToCart() {
      cy.contains('Add to cart').click();
      cy.contains('View Cart').click();
    }
  
    proceedToCheckout() {
      cy.get('.btn-default.check_out').should('be.visible').click();
    }
  }
