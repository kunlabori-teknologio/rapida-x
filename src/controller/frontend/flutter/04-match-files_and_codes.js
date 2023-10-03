const path = require("path");
const chp = require("child_process");
const fs = require("fs");
const { kebabfy } = require("kunla-utils/src/controller/utils/string");

const matchFlutterFilesAndCodes = (code) => {
  const appPath = path.join(
    __dirname,
    "..",
    "..",
    "..",
    "..",
    "apps",
    code.project.folder
  );

  modifyMainComponent(code);

  // for (let i = 0; i < code.components.length; i++) {
  //   const component = code.components[i];
  //   const objectId = component.id;
  //   const objectIdKebab = kebabfy(objectId);
  //   const filePath = `${appPath}/lib/components/${objectIdKebab}/${objectIdKebab}`;

  //   fs.writeFileSync(`${filePath}.html`, component.templateCode);
  //   fs.writeFileSync(`${filePath}.ts`, component.controllerCode);
  // }
};

const modifyMainComponent = async (code) => {
  const appPath = path.join(
    __dirname,
    "..",
    "..",
    "..",
    "..",
    "apps",
    code.project.folder
  );

  let mainCode = fs.readFileSync(`${appPath}/lib/main.dart`, "utf8");

  mainCode = mainCode.replace(
    /title: \'(.*)\'/,
    `title: '${code.project.title} - Home'`
  );
  mainCode = mainCode.replace(
    /MyHomePage\(title: \'(.*)\'/,
    `MyHomePage(title: '${code.project.title}'`
  );

  fs.writeFileSync(`${appPath}/lib/main.dart`, mainCode, {
    encoding: "utf8",
    flag: "w",
  });

  return mainCode;
};

module.exports = {
  matchFlutterFilesAndCodes,
};
