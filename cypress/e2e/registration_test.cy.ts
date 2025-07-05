import { faker } from '@faker-js/faker';
import { RegistrationPage } from "../pages/registration";

const registrationPage = new RegistrationPage();

describe("Registration Test with Faker + fixture password", () => {
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

  it("test_1. Verify user should be register into the system", () => {
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

  it("test_2. verify that the error message should be displayed for invalid email", () => {
    registrationPage.clickCreateAccount();
    registrationPage.enterName(faker.person.fullName());
    registrationPage.enterEmail(testData.invalid_email);
    registrationPage.enterPassword(testData.password);
    registrationPage.enterConfirmPassword(testData.confirm_password);
    registrationPage.clickRegister();
    registrationPage.invalid_email_assertation();

  });





  
});
