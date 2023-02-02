import { screen } from "@testing-library/dom";

import fs from "fs";
import path from "path";

import { changeText, logEnv } from "../modules/checkFunctionality";

const htmlDocPath = path.join(process.cwd(), "src", "index.html");
const htmlDocContent = fs.readFileSync(htmlDocPath).toString();

document.body.innerHTML = htmlDocContent;

test("it should output to the console 3 times", () => {
  const oldConsoleLog = console.log;
  console.log = jest.fn();

  logEnv();

  expect(console.log).toHaveBeenCalledTimes(3);
  console.log = oldConsoleLog;
});

test("it should dynamically change the test text", () => {
  changeText();

  expect(screen.getByText(/working properly/i)).toBeInTheDocument();
});
