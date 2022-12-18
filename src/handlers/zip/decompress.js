import { createBrotliDecompress } from "node:zlib";
import { pipeline } from "stream/promises";
import { createReadStream, createWriteStream } from "node:fs";
import { resolve, parse } from "node:path";
import { getPath, validateUserInput } from "../utils/index.js";
import { ERRORS } from "../../constants.js";

export const decompress = async (...args) => {
  validateUserInput(args, 2);

  try {
    const [path, destination] = args;
    const pathToFile = getPath(path);
    const fileName = parse(pathToFile).base;
    const pathToDestination = resolve(destination, fileName.slice(0, -3));

    const zip = createBrotliDecompress();
    const readable = createReadStream(getPath(pathToFile));
    const writable = createWriteStream(pathToDestination);

    await pipeline(readable, zip, writable);
  } catch {
    throw new Error(ERRORS.operationFailed);
  }
};
