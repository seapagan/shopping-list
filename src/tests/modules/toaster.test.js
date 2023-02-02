/* eslint-disable no-import-assign */
import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

import { setupToaster, toastMessage } from "../../modules/toaster";

beforeEach(() => {
  document.body.innerHTML = "<main></main>";
  setupToaster();
});

test("toaster dock should be added automatically", () => {
  expect(document.querySelector(".toaster-dock")).toBeTruthy();
});

test("we can create and display a toaster", () => {
  toastMessage("test toaster message", "warning");

  const toasterDiv = screen.getByTestId("toast");

  expect(toasterDiv).toBeInTheDocument();
  expect(screen.getByText(/test toaster message/i)).toBeInTheDocument();
});

test("the toaster is automatically faded out after a delay", () => {
  jest.useFakeTimers();

  toastMessage("test fading toaster message", "warning");

  const toasterDiv = screen.getByTestId("toast");
  expect(toasterDiv).toBeInTheDocument();
  jest.runAllTimers();
  expect(toasterDiv).not.toBeInTheDocument();
});

test.skip("clicking the toaster should remove it", () => {
  toastMessage("test fading toaster message", "warning");

  const toasterDiv = screen.getByTestId("toast");
  expect(toasterDiv).toBeInTheDocument();
});
