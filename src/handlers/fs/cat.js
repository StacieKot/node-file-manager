import { createReadStream } from "node:fs";
import { ERRORS } from "../../constants.js";
import { getPath, validateUserInput } from "../utils/index.js";

export const cat = async (...args) => {
  validateUserInput(args, 1);

  try {
    const [path] = args;
    const readable = createReadStream(getPath(path));
    readable.setEncoding("utf8");

    let data = "";

    for await (const chunk of readable) {
      data += chunk;
    }

    console.log(data);
  } catch (err) {
    throw new Error(ERRORS.operationFailed);
  }
};
