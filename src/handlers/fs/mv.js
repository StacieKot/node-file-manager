import { createReadStream, createWriteStream } from "node:fs";
import { parse, join } from "node:path";
import { pipeline } from "node:stream/promises";
import { rm } from "node:fs/promises";
import { ERRORS } from "../../constants.js";
import { getPath, validateUserInput } from "../utils/index.js";

export const mv = async (...args) => {
  validateUserInput(args, 2);

  try {
    const [path, newDirectory] = args;
    const pathToFile = getPath(path);
    const newDirectoryPath = getPath(newDirectory);
    const fileName = parse(pathToFile).base;

    const readable = createReadStream(pathToFile);
    const writable = createWriteStream(join(newDirectoryPath, fileName));

    await pipeline(readable, writable);
    await rm(pathToFile);
  } catch {
    throw new Error(ERRORS.operationFailed);
  }
};
