import { screen } from "@testing-library/dom";

import fs from "fs";
import path from "path";

const htmlDocPath = path.join(process.cwd(), "src", "index.html");
const htmlDocContent = fs.readFileSync(htmlDocPath).toString();

describe("the default HTML", () => {
  beforeEach(() => {
    document.body.innerHTML = htmlDocContent;
  });
  test("should have 2 <fieldset> with specific content", () => {
    const fieldsets = screen.getAllByRole("group");

    expect(fieldsets.length).toBe(2);
    const [buyField, boughtField] = fieldsets;

    // check classes
    expect(buyField).toHaveTextContent("To Buy");
    expect(boughtField).toHaveTextContent("Bought");

    // check lists
  });
});

describe("on page load", () => {
  beforeEach(() => {
    document.body.innerHTML = htmlDocContent;
  });

  test("the toaster-dock should be injected automatically", () => {
    require("../index");

    expect(document.querySelector(".toaster-dock")).toBeTruthy();
  });

  test("the fieldsets should be hidden", () => {
    require("../index");

    const [buy, bought] = screen.getAllByRole("group");

    expect(buy).toBeVisible();
    expect(bought).not.toBeVisible();
  });
});
