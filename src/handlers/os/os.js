import { EOL, cpus, homedir, userInfo, arch } from "node:os";
import { ERRORS } from "../../constants.js";
import { validateUserInput } from "../utils/index.js";
import { OS_COMMAND } from "./constants.js";

export const os = (...args) => {
  validateUserInput(args, 1);

  const [arg] = args;

  switch (arg) {
    case OS_COMMAND.EOL:
      console.log(JSON.stringify(EOL));
      break;
    case OS_COMMAND.cpus:
      const info = cpus().map(({ model, speed }) => ({
        model,
        speed: `${speed / 1000} GHz`,
      }));

      console.table(`overall amount of CPUS - ${info.length}`);
      console.table(info);
      break;
    case OS_COMMAND.homedir:
      console.log(homedir());
      break;
    case OS_COMMAND.username:
      console.log(userInfo().username);
      break;
    case OS_COMMAND.architecture:
      console.log(arch());
      break;

    default:
      throw new Error(ERRORS.invalidInput);
  }
};
