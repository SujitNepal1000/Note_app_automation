import { NotePage } from "../pages/note";

const notePage = new NotePage();

describe("Note Feature Test Suite", () => {
  let testData: any;

  before(() => {
    cy.fixture("data").then((data) => {
      testData = data.data;
    });
  });

  beforeEach(() => {
    notePage.login(testData.email, testData.password);
  });

  it("[@regression] 1. Verify that user can create a new note", () => {
    notePage.clickAddNote();
    notePage.enterTitle(testData.note_title);
    notePage.enterDescription(testData.note_description);
    notePage.submitNote();
    notePage.assertNoteVisible(testData.note_title);
  });


  it("[@regression] 2. Verify error when creating note without title", () => {
    notePage.clickAddNote();
    notePage.enterDescription(testData.note_description);
    notePage.submitNote();
    notePage.assertValidationError("Title is required");
  });


  it("[@regression] 3. Verify error when creating note without description", () => {
    notePage.clickAddNote();
    notePage.enterTitle(testData.note_title);
    notePage.submitNote();
    notePage.assertValidationError("Description is required");
  });


  it("[@regression] 4. Verify that note can be created with check mark on completed", () => {
    notePage.clickAddNote();
    notePage.toggleCompleted();
    notePage.enterTitle(testData.note_title);
    notePage.enterDescription(testData.note_description);
    notePage.submitNote();
    notePage.assertcompletedVisible();
  });


  it("[@regression] 5. Verify that user can edit a note", () => {
    notePage.clickEditNote();
    notePage.enterTitle(testData.updated_note_title);
    notePage.enterDescription(testData.updated_note_description);
    notePage.submitNote();
    notePage.assertNoteVisible(testData.updated_note_title);
  });


  it("[@smoke] 6. Verify error is displayed when edit note and saved with empty title", () => {
    notePage.clickEditNote();
    notePage.enterTitle('');
    notePage.submitNote();
    notePage.assertValidationError("Title is required");
  });


  it("[@smoke] 7. Verify error is displayed when edit note and saved with empty description", () => {
    notePage.clickEditNote();
    notePage.enterDescription('');
    notePage.submitNote();
    notePage.assertValidationError("Description is required");
  });


  it("[@smoke] 8. Verify that user can view a note", () => {
    notePage.assertNoteVisible(testData.updated_note_title);
  });

   it("[@smoke] 9. Verify that delete confirmation popup appears", () => {
    notePage.clickDeleteNote();
    notePage.assertDeletePopupVisible();
  });


  it("[@regression] 10. Verify that user can delete a note", () => {
    notePage.clickDeleteNote();
    notePage.confirmDelete();
    notePage.assertNoteNotVisible(testData.updated_note_title);
  });


  it("[@regression] 11. Verify that search returns matching notes", () => {
    notePage.searchNote(testData.search_keyword);
    notePage.clickseahbtn();
    notePage.assertNoteVisible(testData.note_title);
  });

   it("[@smoke]12. Verify that empty search shows all notes", () => {
    notePage.searchNote(' ');
    notePage.clickseahbtn();
    notePage.assertNotesCountGreaterThan(0);
    });

  it("[@smoke] 13. Verify that unmatched search shows empty state", () => {
    notePage.searchNote(testData.invalid_keyword);
    notePage.clickseahbtn();
    notePage.assertNoNotesVisible();
     });


  it("14. Verify that filter by category Home", () => {
    notePage.filterByCategory('Home');
    cy.get('[data-testid="note-card"]').should('exist');
  });
});
