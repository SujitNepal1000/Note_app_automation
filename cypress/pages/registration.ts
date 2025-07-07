export class RegistrationPage {
  private createAccountBtn = '[data-testid="open-register-view"]';
  private nameInput = '#name';
  private emailInput = '#email';
  private passwordInput = '#password';
  private confirmPasswordInput = '#confirmPassword';
  private registerButton = 'button[type="submit"]';

  private successfullyCreatedMsg = 'b';
  private invalidEmailMsg = ':nth-child(1) > :nth-child(1) > .invalid-feedback';
  private requiredEmailMsg = '#email ~ .invalid-feedback';
  private requiredPasswordMsg = '#password ~ .invalid-feedback';
  private confirmPasswordMismatchMsg = '#confirmPassword ~ .invalid-feedback';
  private emailExistsMsg = '[data-testid="alert-message"]';

  clickCreateAccount() {
    cy.get(this.createAccountBtn).click();
  }

  enterName(name: string) {
    cy.get(this.nameInput).type(name);
  }

  enterEmail(email: string) {
    cy.get(this.emailInput).type(email);
  }

  enterPassword(password: string) {
    cy.get(this.passwordInput).type(password);
  }

  enterConfirmPassword(confirmPassword: string) {
    cy.get(this.confirmPasswordInput).type(confirmPassword);
  }

  clickRegister() {
    cy.get(this.registerButton).click();
  }

  successfullyUserRegisterAssertion() {
    cy.get(this.successfullyCreatedMsg).should('contain.text', 'User account created successfully');
  }

  invalidEmailAssertion() {
    cy.get(this.invalidEmailMsg).should('contain.text', 'Email address is invalid');
  }

  requiredEmailAssertion() {
    cy.get(this.requiredEmailMsg).should('contain.text', 'Email address is required');
  }

  requiredPasswordAssertion() {
    cy.get(this.requiredPasswordMsg).should('contain.text', 'Password is required');
  }

  passwordMismatchAssertion() {
    cy.get(this.confirmPasswordMismatchMsg).should('contain.text', "Passwords don't match!");
  }

  emailExistsAssertion() {
    cy.get(this.emailExistsMsg).should('contain.text', 'An account already exists with the same email address');
  }
}
