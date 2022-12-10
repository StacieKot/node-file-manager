import { readFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { ERRORS } from "../../constants.js";
import { getPath, validateUserInput } from "../utils/index.js";

export const hash = async (...args) => {
  validateUserInput(args, 1);

  try {
    const [path] = args;
    const content = await readFile(getPath(path), { encoding: "utf8" });
    const hashValue = createHash("sha256").update(content).digest("hex");

    console.log(hashValue);
  } catch {
    throw new Error(ERRORS.operationFailed);
  }
};
