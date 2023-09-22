const path = require('path');
const fs = require('fs');

const matchDokumentadoFilesAndCodes = (code) => {
  const appPath = path.join(__dirname, '..', '..', '..', '..', 'apps');
  
  fs.writeFileSync(`${appPath}/${code.project.folder}-document/${code.project.folder}-dokumentado.html`, code.code);
}

module.exports = {
  matchDokumentadoFilesAndCodes
}