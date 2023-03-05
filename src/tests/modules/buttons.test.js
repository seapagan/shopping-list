/* eslint-disable sonarjs/no-duplicate-string */
import { checkButton, deleteButton, editButton } from "../../modules/buttons";

describe("the delete button", () => {
  test("should be created properly", () => {
    const theButton = deleteButton();

    expect(theButton).toBeDefined();
    expect(theButton.className).toMatch(/delete-button/);
  });
});

describe("the check button", () => {
  test("should be created properly", () => {
    const theButton = checkButton();

    expect(theButton).toBeDefined();
    expect(theButton.className).toMatch(/checked-button/);
  });
});

describe("the edit button", () => {
  test("should be created properly", () => {
    const theButton = editButton();

    expect(theButton).toBeDefined();
    expect(theButton.className).toMatch(/edit-button/);
  });
});
