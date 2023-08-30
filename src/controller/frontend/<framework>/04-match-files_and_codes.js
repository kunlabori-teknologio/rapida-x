const path = require('path');
const fs = require('fs');
const { kebabfy } = require('kunla-utils/src/controller/utils/string');

const matchFrameworkFilesAndCodes = (code) => {
  const appPath = path.join(__dirname, '..', '..', '..', '..', 'apps', code.project.folder);

  for (let i = 0; i < code.components.length; i++) {
    const component = code.components[i];
    const objectId = component.id;
    const objectIdKebab = kebabfy(objectId);
    const filePath = `${appPath}/components_folder_path/${objectIdKebab}/${objectIdKebab}`;

    fs.writeFileSync(`${filePath}.html`, component.templateCode);
    fs.writeFileSync(`${filePath}.ts`, component.controllerCode);
  }
}

module.exports = {
  matchFrameworkFilesAndCodes
}