export class ProductPage {
  searchProduct(productName) {
    cy.get('[data-qa="search-product"]').type(productName);
    cy.get('[data-qa="search-button"]').click();

  }

  verifySubscription() {
    cy.get('input#susbscribe_email').scrollIntoView().type(email);
    cy.get('button#subscribe').click();
    cy.contains('You have been successfully subscribed!').should('be.visible');

  }

  goToContactUs() {
    cy.contains('Contact us').click();
  }

  fillContactForm() {
    cy.get('[data-qa="name"]').type('Tester');
    cy.get('[data-qa="email"]').type('tester-qa@mail.com');
    cy.get('[data-qa="subject"]').type('Test Automation');
    cy.get('[data-qa="message"]').type('Learning Test Automation');
    cy.fixture('example.json').as('file');
    cy.get('input[name="upload_file"]').selectFile('@file');
    cy.get('[data-qa="submit-button"]').click();
  }

  verifyContactFormSubmission() {
    cy.get('.status').should('have.text', 'Success! Your details have been submitted successfully.');
  }

  verifyAllProducts() {
    cy.contains('Products').click();
    cy.url().should('contain', 'products');
    cy.get('.title').should('be.visible').and('contain', 'All Products');
    cy.get('.single-products').should('be.visible').and('have.length.at.least', 1);
  }

  verifyProductDetails() {
    cy.get('.single-products').first().parent().contains('View Product').click();
    cy.get('.product-information > h2').should('be.visible');
    cy.get('.product-information p').should('be.visible').and('have.length', 4);
    cy.get('.product-information span span').should('be.visible');
  }

  searchAndVerifyProduct(productName) {
    this.searchProduct(productName);
    cy.get('.title').should('be.visible').and('contain', 'Searched Products');
    cy.get('.single-products').should('be.visible').and('have.length.at.least', 1);
  }
}

