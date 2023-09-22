const path = require('path');
const chp = require('child_process');
const { kebabfy } = require('kunla-utils/src/controller/utils/string');

const makeDokumentadoFiles = (code) => {
  const appPath = path.join(__dirname, '..', '..', '..', '..', 'apps');
  
  chp.execSync(
    `rm -f ${code.project.folder}-document/${code.project.folder}-dokumentado.html && mkdir -p ${code.project.folder}-document && touch ${code.project.folder}-document/${code.project.folder}-dokumentado.html`,
    { cwd: appPath }
  );
  
  return false;
}

module.exports = {
  makeDokumentadoFiles
}