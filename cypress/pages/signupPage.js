
export class SignupPage {

  fillSignupForm(user) {
    cy.contains('Signup').click()
    cy.get('[data-qa="signup-name"]').type(user.name);
    cy.get('[data-qa=signup-email]').type(user.email);
    cy.get('[data-qa="signup-button"]').click();
    cy.get('input[type=radio]').eq(0).check();
    cy.get('[data-qa="password"]').type(user.password, { log: false });
    cy.get('[data-qa=days]').select(user.day);
    cy.get('[data-qa="months"]').select(user.month);
    cy.get('[data-qa="years"]').select(user.year);
    cy.get('input[type=checkbox]#newsletter').check();
    cy.get('input[type=checkbox]#optin').check();
    cy.get('[data-qa="first_name"]').type(user.firstName);
    cy.get('[data-qa="last_name"]').type(user.lastName);
    cy.get('[data-qa="company"]').type(user.company);
    cy.get('[data-qa="address"]').type(user.address);
    cy.get('[data-qa="country"]').select(user.country);
    cy.get('[data-qa="state"]').type(user.state);
    cy.get('[data-qa="city"]').type(user.city);
    cy.get('[data-qa="zipcode"]').type(user.zipcode);
    cy.get('[data-qa="mobile_number"]').type(user.phoneNumber);
    cy.get('[data-qa="create-account"]').click();
  }

  verifyAccountCreated(name) {
    cy.url().should('include', 'account_created');
    cy.get('[data-qa="account-created"]').should('be.visible');
    cy.get('[data-qa="continue-button"]').click();
    cy.get('i.fa-user').parent().should('contain', name);
  }
  verifyEmailExists() {
    cy.get('.signup-form form p').should('be.visible').and('contain', 'Email Address already exist!');
  }
}

