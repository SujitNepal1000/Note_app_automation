import { faker } from '@faker-js/faker';
import { RegistrationPage } from "../pages/registration";

const registrationPage = new RegistrationPage();

describe("Registration Test Suite", () => {
  let testData: any;

  before(() => {
    cy.fixture("data").then((data) => {
      testData = data.data;
    });
  });

  beforeEach(() => {
    const baseUrl = Cypress.config("baseUrl");
    if (typeof baseUrl === "string") {
      cy.visit(baseUrl);
    } else {
      throw new Error("baseUrl is not defined in Cypress config.");
    }
  });

  it("[@regression] test_1. Verify user should be registered into the system", () => {
    const randomName = faker.person.fullName();
    const randomEmail = faker.internet.email();

    registrationPage.clickCreateAccount();
    registrationPage.enterName(randomName);
    registrationPage.enterEmail(randomEmail);
    registrationPage.enterPassword(testData.password);
    registrationPage.enterConfirmPassword(testData.confirm_password);
    registrationPage.clickRegister();
    registrationPage.successfullyUserRegisterAssertion();
  });

  it("[@regression] test_2. Verify error message is displayed for invalid email", () => {
    registrationPage.clickCreateAccount();
    registrationPage.enterName(faker.person.fullName());
    registrationPage.enterEmail(testData.invalid_email);
    registrationPage.enterPassword(testData.password);
    registrationPage.enterConfirmPassword(testData.confirm_password);
    registrationPage.clickRegister();
    registrationPage.invalidEmailAssertion();
  });

  it("[@regression] test_3. Verify that the email field cannot be empty", () => {
    registrationPage.clickCreateAccount();
    registrationPage.enterName(faker.person.fullName());
    // No email entered
    registrationPage.enterPassword(testData.password);
    registrationPage.enterConfirmPassword(testData.confirm_password);
    registrationPage.clickRegister();
    registrationPage.requiredEmailAssertion();
  });

  it("[@regression] test_4. Verify that the password field cannot be empty", () => {
    registrationPage.clickCreateAccount();
    registrationPage.enterName(faker.person.fullName());
    registrationPage.enterEmail(faker.internet.email());
    // No password entered
    registrationPage.enterConfirmPassword(testData.confirm_password);
    registrationPage.clickRegister();
    registrationPage.requiredPasswordAssertion();
  });

  it("[@regression] test_5. Verify that password and confirm password must match", () => {
    registrationPage.clickCreateAccount();
    registrationPage.enterName(faker.person.fullName());
    registrationPage.enterEmail(faker.internet.email());
    registrationPage.enterPassword(testData.password);
    registrationPage.enterConfirmPassword(testData.mismatch_confirm_password);
    registrationPage.clickRegister();
    registrationPage.passwordMismatchAssertion();
  });

  it("[@regression] test_6. Verify error is shown for existing email", () => {
    registrationPage.clickCreateAccount();
    registrationPage.enterName(faker.person.fullName());
    registrationPage.enterEmail(testData.existing_email);
    registrationPage.enterPassword(testData.password);
    registrationPage.enterConfirmPassword(testData.confirm_password);
    registrationPage.clickRegister();
    registrationPage.emailExistsAssertion();
  });
});
