export class LoginPage {
 
    login(user) {
      cy.contains('Signup').click();
      cy.contains('Signup').click();
      cy.get('[data-qa="login-email"]').type(user.email);
      cy.get('[data-qa="login-password"]').type(user.password, { log: false });
      cy.get('[data-qa="login-button"]').click();
    }

    verifyLogin(user) {
      cy.get('i.fa-user').parent().should('contain', user.name);
    }

    loginWithInvalidPassword(user) {
      cy.get('[data-qa="login-email"]').type(user.email);
      cy.get('[data-qa="login-password"]').type('wrongpassword');
      cy.get('[data-qa="login-button"]').click();
    }
  
    verifyLoginFailed() {
      cy.get('p').should('contain', 'Your email or password is incorrect!');
    }

    logout() {
      cy.contains('Logout').click();
    }
    verifyLogout() {
      cy.url().should('contain', 'login');
      cy.contains('Login to your account').should('be.visible');
    }
}
  