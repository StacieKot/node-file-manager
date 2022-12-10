import * as readline from "node:readline/promises";
import { argv, chdir } from "node:process";
import { stdin as input, stdout as output } from "node:process";
import { homedir } from "node:os";
import { getUserName, printDirectory } from "./utils.js";
import { EXIT } from "./constants.js";
import { handleCommand } from "./handlers/index.js";

chdir(homedir());

const rl = readline.createInterface({ input, output });

const userName = getUserName(argv.slice(2));

console.log(`Welcome to the File Manager, ${userName}!`);

printDirectory();

rl.on("line", async (input) => {
  if (input === EXIT) {
    return rl.close();
  }

  await handleCommand(input);
});

rl.on("close", () => {
  console.log(`Thank you for using File Manager, ${userName}, goodbye!`);
});
