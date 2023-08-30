const path = require('path');
const fs = require('fs');
const { kebabfy } = require('kunla-utils/src/controller/utils/string');

const matchAngularFilesAndCodes = (code) => {
  const appPath = path.join(__dirname, '..', '..', '..', '..', 'apps', code.project.folder);

  for (let i = 0; i < code.components.length; i++) {
    const component = code.components[i];
    const objectId = component.id;
    const objectIdKebab = kebabfy(objectId);
    const filePath = `${appPath}/src/app/components/${objectIdKebab}/${objectIdKebab}`;

    fs.writeFileSync(`${filePath}.component.html`, component.templateCode);
    fs.writeFileSync(`${filePath}.component.ts`, component.controllerCode);
  }
}

module.exports = {
  matchAngularFilesAndCodes
}