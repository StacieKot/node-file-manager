import { chdir } from "node:process";
import { ERRORS } from "../../constants.js";
import { getPath, validateUserInput } from "../utils/index.js";

export const cd = async (...args) => {
  validateUserInput(args, 1);

  try {
    const [path] = args;
    const resolvedPath = getPath(path);
    chdir(resolvedPath);
  } catch {
    throw new Error(ERRORS.operationFailed);
  }
};
