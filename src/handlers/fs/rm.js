import { rm as removeFile } from "node:fs/promises";
import { ERRORS } from "../../constants.js";
import { validateUserInput } from "../utils/index.js";

export const rm = async (...args) => {
  validateUserInput(args, 1);

  try {
    const [pathToFile] = args;

    await removeFile(pathToFile);
  } catch {
    throw new Error(ERRORS.operationFailed);
  }
};
