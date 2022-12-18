import { resolve, normalize, isAbsolute } from "node:path";
import { cwd } from "node:process";
import { throwInvalidInputError } from "../../utils.js";

export const stringComparer = (str1, str2) => {
  const str1ToCompare = str1.toLowerCase();
  const str2ToCompare = str2.toLowerCase();

  return str1ToCompare < str2ToCompare
    ? -1
    : str1ToCompare > str2ToCompare
    ? 1
    : 0;
};

export const getPath = (path) =>
  isAbsolute(path) ? normalize(path) : resolve(cwd(), path);

export const validateUserInput = (args = [], expectedArgsNumber) => {
  const isUserInputValid = expectedArgsNumber
    ? args.length === expectedArgsNumber
    : !args.length;

  if (!isUserInputValid) {
    throwInvalidInputError();
  }
};
