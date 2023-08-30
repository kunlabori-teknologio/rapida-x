const path = require('path');
const chp = require('child_process');
const { kebabfy } = require('kunla-utils/src/controller/utils/string');

const makeFrameworkFiles = (code) => {
  const appPath = path.join(__dirname, '..', '..', '..', '..', 'apps', code.project.folder);
  
  /**
   * Generate components and modules structure
   */
}

module.exports = {
  makeFrameworkFiles
}