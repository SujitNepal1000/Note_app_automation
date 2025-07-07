import { faker } from '@faker-js/faker';
import { LoginPage } from "../pages/login";

const loginPage = new LoginPage();

describe("Login Test Suite", () => {
  let testData: any;

  before(() => {
    cy.fixture("data").then((data) => {
      testData = data.data;
    });
  });

  beforeEach(() => {
    loginPage.visitLoginPage();
  });

  it("[@smoke] test_1. Verify that the login page loads correctly", () => {
    cy.url().should('include', '/login');
    cy.get('#email').should('be.visible').and('have.value', '');
    cy.get('#password').should('be.visible').and('have.value', '');
    cy.get('button[type="submit"]').should('contain.text', 'Login');

    // Optional check
    cy.get('#email').type(testData.email).should('have.value', testData.email);
    cy.get('#password').type(testData.password).should('have.value', testData.password);
  });

  it("[@regression] test_2. Verify user can login with valid credentials", () => {
    loginPage.enterEmail(testData.email);
    loginPage.enterPassword(testData.password);
    loginPage.clickLogin();
    loginPage.assertLoginSuccessful();
  });

  it("[@regression] test_3. Verify login fails with invalid credentials", () => {
    loginPage.enterEmail(testData.invalid_email);
    loginPage.enterPassword(testData.password);
    loginPage.clickLogin();
    loginPage.assertLoginErrorMessage();
  });

  it("[@regression] test_4. Verify validation for empty login fields", () => {
    loginPage.clickLogin();
    loginPage.assertEmailRequired();
    loginPage.assertPasswordRequired();
  });

  it("[@regression] test_5. Verify error for unregistered email", () => {

    const randomEmail = faker.internet.email();

    loginPage.enterEmail(randomEmail);
    loginPage.enterPassword(testData.password);
    loginPage.clickLogin();
    loginPage.assertinvalidlogin();
  });

  it("[@regression] test_6. Verify Enter key submits the login form", () => {
    loginPage.enterEmail(testData.email);
    loginPage.enterPassword(testData.password);
    loginPage.pressEnterKey();
    loginPage.assertLoginSuccessful();
  });

  it("[@smoke] test_7. Verify password field is masked", () => {
    loginPage.assertPasswordIsMasked();
  });
});
