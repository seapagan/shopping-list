/* eslint-disable no-import-assign */
import * as checkFunc from "../modules/checkFunctionality";

test("This test suite is found and run", () => {
  expect(true).toBeTruthy();
});

test("index.js automatically calls the 2 verification functions", () => {
  checkFunc.changeText = jest.fn();
  checkFunc.logEnv = jest.fn();

  require("../index");

  expect(checkFunc.changeText).toHaveBeenCalled();
  expect(checkFunc.logEnv).toHaveBeenCalled();
});
