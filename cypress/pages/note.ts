export class NotePage {
  private addNoteBtn = '[data-testid="add-new-note"]';
  private titleInput = '#title';
  private descriptionInput = '#description';
  private completedCheckbox = '[data-testid="note-completed"]';
  private createNoteBtn = '[data-testid="note-submit"]';
  private noteCard = '[data-testid="note-card"]';
  private editBtn = ':nth-child(2) > [data-testid="note-card"] > .card-footer > div > [data-testid="note-edit"]';
  private deleteBtn = ':nth-child(2) > [data-testid="note-card"] > .card-footer > div > [data-testid="note-delete"]';
  private confirmDeleteBtn = '[data-testid="note-delete-confirm"]';
  private searchInput = '[data-testid="search-input"]';
  private searchBtn = '[data-testid="search-btn"]';
  private homeTab = '[data-testid="category-home"]';
  private workTab = '[data-testid="category-work"]';
  private personalTab = '[data-testid="category-personal"]';

    login(email: string, password: string) {
    cy.visit(Cypress.config('baseUrl') + '/login', { failOnStatusCode: false });
    cy.get('#email').type(email);
    cy.get('#password').type(password);
    cy.get('button[type="submit"]').click();
    }

  clickAddNote() {
    cy.get(this.addNoteBtn).click();
  }

  enterTitle(title: string) {
  cy.get(this.titleInput).clear();
  if (title.length > 0) {
    cy.get(this.titleInput).type(title);
  }
}

  enterDescription(description: string) {
  cy.get(this.descriptionInput).clear();
  if (description.length > 0) {
    cy.get(this.descriptionInput).type(description);
  }
}

  toggleCompleted() {
    cy.get(this.completedCheckbox).click();
  }

  submitNote() {
    cy.get(this.createNoteBtn).click();
  }

  clickEditNote() {
    cy.get(this.editBtn).first().click();
  }

  clickDeleteNote() {
    cy.get(this.deleteBtn).first().click();
  }

  confirmDelete() {
    cy.get(this.confirmDeleteBtn).click();
  }

  searchNote(keyword: string) {
  cy.get('body').then(() => {
    cy.get(this.searchInput).should('exist').should('be.visible');
    cy.get(this.searchInput).clear();
    cy.get(this.searchInput).type(keyword);
  });
}

  clickseahbtn(){
    cy.get(this.searchBtn).click();
  }

  filterByCategory(category: 'Home' | 'Work' | 'Personal') {
    const tabMap = {
      Home: this.homeTab,
      Work: this.workTab,
      Personal: this.personalTab
    };
    cy.get(tabMap[category]).click();
  }

  assertNoteVisible(title: string) {
    cy.contains(this.noteCard, title).should('be.visible');
  }

  assertNoteNotVisible(title: string) {
    cy.contains(this.noteCard, title).should('not.exist');
  }

  assertcompletedVisible() {
  cy.get('[data-testid="toggle-note-switch"]').should('be.checked');
}

  assertValidationError(message: string) {
    cy.contains('.invalid-feedback, .alert', message).should('be.visible');
  }

  assertDeletePopupVisible() {
    cy.get(this.confirmDeleteBtn).should('be.visible');
  }

  assertNotesCountGreaterThan(count: number) {
    cy.get(this.noteCard).its('length').should('be.gt', count);
  }

  assertNoNotesVisible() {
    cy.get(this.noteCard).should('have.length', 0);
  }
}
