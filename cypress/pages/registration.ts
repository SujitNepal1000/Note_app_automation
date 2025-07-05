export class RegistrationPage {
  private createAccountBtn = '[data-testid="open-register-view"]';
  private nameInput = '#name';
  private emailInput = '#email';
  private passwordInput = '#password';
  private confirmPasswordInput = '#confirmPassword';
  private registerButton = 'button[type="submit"]';
  private successfullyCreatedMsg = 'b'; 
  private invalid_email_msg = ':nth-child(1) > :nth-child(1) > .invalid-feedback'

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

  invalid_email_assertation(){
    cy.get(this.invalid_email_msg).should('contain.text','Email address is invalid')
  }



}
