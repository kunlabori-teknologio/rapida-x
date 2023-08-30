const path = require('path');
const chp = require('child_process');
const projectsPath = path.join(__dirname, '..', '..', '..', '..', 'project');
const appsPath = path.join(__dirname, '..', '..', '..', '..', 'apps');

const makeFrameworkSkeleton = async (array) => {
  const project = array[0].project;
  
  console.info(`Check project folder existence`);
  try {
    chp.execSync(`[ -d "${appsPath}/${project.folder}" ]`);
    console.info(`${projectsPath}/${project.folder} already exists`);

    return true;
  } catch (err) {
    try {
      /**
       * Use CLI, if exists, to start basic project architecture here
       */
      return true;
    } catch (error) {
      console.warn(error.message);
      return error.message;
    }
  }
}

module.exports = {
  makeFrameworkSkeleton
}