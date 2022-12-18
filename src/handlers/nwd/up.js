import { chdir } from "node:process";
import { ERRORS } from "../../constants.js";
import { validateUserInput } from "../utils/index.js";

export const up = (...args) => {
  validateUserInput(args);

  try {
    chdir("..");
  } catch (err) {
    throw new Error(ERRORS.operationFailed);
  }
};
