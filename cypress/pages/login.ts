export class LoginPage {
  private emailInput = '#email';
  private passwordInput = '#password';
  private loginButton = 'button[type="submit"]';

  private errorMsg = ':nth-child(1) > .invalid-feedback';
  private passwordRequiredMsg = '#password ~ .invalid-feedback';
  private invalid_email_password = '[data-testid="alert-message"]';

  visitLoginPage() {
    cy.visit(Cypress.config('baseUrl') + '/login');
  }

  enterEmail(email: string) {
    cy.get(this.emailInput).type(email);
  }

  enterPassword(password: string) {
    cy.get(this.passwordInput).type(password);
  }

  pressEnterKey() {
    cy.get(this.passwordInput).type('{enter}');
  }

  clickLogin() {
    cy.get(this.loginButton).click();
  }

  assertLoginSuccessful() {
    cy.url().should('not.include', '/login');
  }

  assertLoginErrorMessage() {
    cy.get(this.errorMsg).should('contain.text',"Email address is invalid");
  }

  assertEmailRequired() {
    cy.get(this.errorMsg).should('contain.text', 'Email address is required');
  }

  assertPasswordRequired() {
    cy.get(this.passwordRequiredMsg).should('contain.text', 'Password is required');
  }

  assertinvalidlogin(){
    cy.get(this.invalid_email_password).should('contain.text', "Incorrect email address or password");
  }

  assertPasswordIsMasked() {
    cy.get(this.passwordInput).should('have.attr', 'type', 'password');
  }
}
