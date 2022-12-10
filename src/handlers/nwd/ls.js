import { readdir, lstat } from "node:fs/promises";
import { cwd } from "node:process";
import { ERRORS } from "../../constants.js";
import { stringComparer, validateUserInput } from "../utils/index.js";

export const ls = async (...args) => {
  validateUserInput(args);

  try {
    const folderFiles = await readdir(cwd());

    const dataToPrint = await Promise.all(
      folderFiles.sort(stringComparer).map(async (file) => {
        const stat = await lstat(file);
        const type = stat.isFile() ? "file" : "directory";

        return { name: file, type };
      })
    );

    const files = dataToPrint.filter((value) => value.type === "file");
    const folders = dataToPrint.filter((value) => value.type === "directory");

    console.table([...folders, ...files]);
  } catch {
    throw new Error(ERRORS.operationFailed);
  }
};
