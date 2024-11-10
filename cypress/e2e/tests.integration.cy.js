import { userFactory } from '../support/factory';
import { SignupPage } from '../pages/signupPage';
import { LoginPage } from '../pages/loginPage';
import { ProductPage } from '../pages/productPage';
import { CartPage } from '../pages/cartPage';
import { CheckoutPage } from '../pages/checkoutPage';
import { AccountPage } from '../pages/accountPage';
import { beforeEach } from 'mocha';


describe('Automation Exercise', () => {
  const signupPage = new SignupPage();
  const loginPage = new LoginPage();
  const productPage = new ProductPage();
  const cartPage = new CartPage();
  const checkoutPage = new CheckoutPage();
  const accountPage = new AccountPage();

  beforeEach(() => {
    cy.visit('https://automationexercise.com/');
  });

  it('Test Case 1: Register a new user', () => {
    const user = userFactory();
    signupPage.fillSignupForm(user);
    signupPage.verifyAccountCreated(user.name);
  });

  it('Test Case 2: Login with correct email and password', () => {
    //Para refatorar:
    // const user = userFactory();
    // signupPage.fillSignupForm(user);
    // //loginPage.logout();
    // loginPage.login(user);
    // loginPage.verifyLogin(user.name);
    cy.contains('Signup').click()
    cy.get('[data-qa="login-email"]').type('tester-1721346302730@mail.com')
    cy.get('[data-qa="login-password"]').type('12345', { log: false })
    cy.get('[data-qa="login-button"]').click()
    cy.get('i.fa-user').parent().should('contain', 'Tester QA')
  });

  it('Test Case 3: Login with incorrect email and password', () => {
    //Para refatorar:
    // const user = userFactory();
    // signupPage.fillSignupForm(user);
    // loginPage.loginWithInvalidPassword(user);
    // loginPage.verifyLoginFailed();

    cy.contains('Signup').click()
    cy.get('[data-qa="login-email"]').type('tester-1721346302730@mail.com')
    cy.get('[data-qa="login-password"]').type('54321')
    cy.get('[data-qa="login-button"]').click()
    cy.get('p').should('contain', 'Your email or password is incorrect!')
  });

  it('Test Case 4: Logout User', () => {
    //Para refatorar:
    // const user = userFactory();
    // signupPage.fillSignupForm(user);
    // loginPage.login(user);
    // loginPage.logout();
    // loginPage.verifyLogout();
    cy.contains('Signup').click()
    cy.get('[data-qa="login-email"]').type('tester-1721346302730@mail.com')
    cy.get('[data-qa="login-password"]').type('12345', { log: false })
    cy.get('[data-qa="login-button"]').click()
    cy.get('i.fa-user').parent().should('contain', 'Tester QA')
    cy.contains('Logout').click()
    cy.url().should('contain', 'login')
    cy.contains("Login to your account").should("be.visible");
  });

  it('Test Case 5: Register with existing email', () => {
    //Para refatorar:
    // const user = userFactory();
    // signupPage.fillSignupForm(user);
    // signupPage.fillSignupForm(user);
    // signupPage.verifyEmailExists();
    cy.contains('Signup').click()
    cy.get('[data-qa="signup-name"]').type(`Tester QA`)
    cy.get('[data-qa="signup-email"]').type(`tester-1721346302730@mail.com`)
    cy.contains('button', 'Signup').click()
    cy.get(`.signup-form form p`)
      .should('be.visible')
      .and('contain', 'Email Address already exist!')
  });

  it('Test Case 6: Contact Us Form', () => {
    productPage.goToContactUs();
    productPage.fillContactForm();
    productPage.verifyContactFormSubmission();
  });

  it('Test Case 8: Verify All Products and Product Detail Page', () => {
    productPage.verifyAllProducts();
    productPage.verifyProductDetails();
  });

  it('Test Case 9: Search Product', () => {
    cy.contains(`Products`).click()
    cy.url().should('contain', 'products')
    cy.get('.title').should('be.visible').and('contain', 'All Products')
    cy.get('input#search_product').type('Shirt')
    cy.get('button#submit_search').click()
    cy.get('.title').should('be.visible').and('contain', 'Searched Products')
    cy.get('.single-products')
      .should('be.visible')
      .and('have.length.at.least', 1)
  });

  it('Test Case 10: Verify Subscription on Home Page', () => {
    //Para refatorar:
    // const user = userFactory();
    // productPage.verifySubscription(user);
    cy.get('input#susbscribe_email')
    .scrollIntoView()
    .type('tester-qa@mail.com')
    cy.get('button#subscribe').click()
    cy.contains('You have been successfully subscribed!').should('be.visible')
  });

  it('Test Case 15: Place Order: Register before Checkout', () => {
    const user = userFactory();
    signupPage.fillSignupForm(user);
    signupPage.verifyAccountCreated(user.name);
    cartPage.addItemToCart();
    cartPage.proceedToCheckout();
    checkoutPage.verifyCheckoutPageDetails();
    checkoutPage.fillPaymentDetails(user);
    checkoutPage.placeOrder();
    accountPage.deleteAccount();
    accountPage.verifyAccountDeleted();
  });
});
