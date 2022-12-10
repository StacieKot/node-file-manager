import { rename } from "node:fs/promises";
import { ERRORS } from "../../constants.js";
import { resolve, parse } from "node:path";
import { validateUserInput } from "../utils/index.js";

export const rn = async (...args) => {
  validateUserInput(args, 2);

  try {
    const [filename, newFilename] = args;
    const pathToFile = resolve(filename);
    const newPathToFile = resolve(parse(pathToFile).dir, newFilename);

    await rename(pathToFile, newPathToFile);
  } catch {
    throw new Error(ERRORS.operationFailed);
  }
};
