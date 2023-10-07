const path = require('path');
const chp = require('child_process');
const appsPath = path.join(__dirname, '..', '..', '..', '..', '..', '..', 'apps');

const materialInstall = async (project) => {
  console.info(`Create material shared module`);
  chp.execSync(`ng g m ${project.ui} --flat`, {cwd: `${appsPath}/${project.folder}/src/app/modules/shared`});
  console.info(`${appsPath}/${project.folder}/src/app/modules/shared/${project.ui}.module.ts created`);
  
  console.info(`Install ${project.ui} as UI Kit`);
  chp.execSync(`ng add @angular/material --skip-confirmation`, {cwd: `${appsPath}/${project.folder}`});
  console.info(`UI Kit ${project.ui} installed successfully`);

  return true;
}

module.exports = {
  materialInstall
}