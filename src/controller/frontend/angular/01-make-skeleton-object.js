const path = require('path');
const chp = require('child_process');
const projectsPath = path.join(__dirname, '..', '..', '..', '..', 'project');
const appsPath = path.join(__dirname, '..', '..', '..', '..', 'apps');

const makeAngularSkeleton = async (array) => {
  const project = array[0].project;
  
  console.info(`Check project folder existence`);
  try {
    chp.execSync(`[ -d "${appsPath}/${project.folder}" ]`);
    console.info(`${projectsPath}/${project.folder} already exists`);

    return true;
  } catch (err) {
    try {
      console.info(`Install node lts`);
      chp.execSync('/bin/bash -c "source ~/.nvm/nvm.sh && nvm install --lts"');
      console.info(`Install angular lts`);
      chp.execSync('npm uninstall -g @angular/cli && npm cache clean --force && npm cache verify && npm install -g @angular/cli');
      console.info(`Create new angular app "${project.folder}"`);
      chp.execSync(`ng new ${project.folder} --directory apps/${project.folder} --routing --style=scss`);
      console.info(`${projectsPath}/${project.folder} created`);
      console.info(`Create components folder`);
      chp.execSync(`mkdir ${appsPath}/${project.folder}/src/app/components`);
      console.info(`${appsPath}/${project.folder}/src/app/components created`);
      console.info(`Create modules folder`);
      chp.execSync(`mkdir ${appsPath}/${project.folder}/src/app/modules`);
      console.info(`${appsPath}/${project.folder}/src/app/modules created`);
      return true;
    } catch (error) {
      console.warn(error.message);
      return error.message;
    }
  }
}

module.exports = {
  makeAngularSkeleton
}