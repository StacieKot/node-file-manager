import { open } from "node:fs/promises";
import { ERRORS } from "../../constants.js";
import { cwd } from "node:process";
import { resolve } from "node:path";
import { validateUserInput } from "../utils/index.js";

export const add = async (...args) => {
  validateUserInput(args, 1);

  try {
    const [filename] = args;
    let filehandle;
    const pathToFile = resolve(cwd(), filename);
    filehandle = await open(pathToFile, "w");
    await filehandle?.close();
  } catch {
    throw new Error(ERRORS.operationFailed);
  } finally {
    await filehandle?.close();
  }
};
