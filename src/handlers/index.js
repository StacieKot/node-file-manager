import { up } from "./nwd/up.js";
import { cd } from "./nwd/cd.js";
import { ls } from "./nwd/ls.js";
import { cat } from "./fs/cat.js";
import { add } from "./fs/add.js";
import { rn } from "./fs/rn.js";
import { cp } from "./fs/cp.js";
import { mv } from "./fs/mv.js";
import { rm } from "./fs/rm.js";
import { os } from "./os/os.js";
import { hash } from "./hash/hash.js";
import { compress } from "./zip/compress.js";
import { decompress } from "./zip/decompress.js";
import {
  parseInput,
  printDirectory,
  throwInvalidInputError,
} from "../utils.js";

const commandHandlers = {
  up,
  cd,
  ls,
  cat,
  add,
  rn,
  cp,
  mv,
  rm,
  os,
  hash,
  compress,
  decompress,
};

export const handleCommand = async (input) => {
  const userInput = parseInput(input);

  const [command, ...args] = userInput;

  const handler = commandHandlers[command.trim()] || throwInvalidInputError;

  try {
    await handler(...args);
    printDirectory();
  } catch (error) {
    console.log(error.message);
  }
};
