import { cwd } from "node:process";
import { DEFAULT_USER_NAME, ERRORS } from "./constants.js";

export const getUserName = (args = []) =>
  args.find((arg) => /^--username=/.test(arg))?.replace("--username=", "") ||
  DEFAULT_USER_NAME;

export const printDirectory = () => {
  console.log(`You are currently in ${cwd()}`);
};

export const throwInvalidInputError = () => {
  throw new Error(ERRORS.invalidInput);
};
