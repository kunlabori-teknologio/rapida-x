const { makeLoopbackSkeleton } = require("./loopback/01-make-skeleton-object");
// const { makeAngularCode } = require("./angular/02-make-code-object");
// const {
//   makeAngularFiles,
// } = require("./angular/03-make-files-array_of_objects");
// const {
//   matchAngularFilesAndCodes,
// } = require("./angular/04-match-files_and_codes");

let code = "";

const createBackendFramework = async (array) => {
  switch (array[0].project.backendFramework) {
    case "loopback":
      loopback(array);
      break;

    case "nest":
      break;

    case "go":
      break;

    default:
      break;
  }
};

const loopback = async (array) => {
  await makeLoopbackSkeleton(array);
  // const code = await makeAngularCode(array);
  // makeAngularFiles(code);
  // matchAngularFilesAndCodes(code);
  return false;
};

const nest = (array) => {};

const go = (array) => {};

module.exports = {
  createBackendFramework,
};
