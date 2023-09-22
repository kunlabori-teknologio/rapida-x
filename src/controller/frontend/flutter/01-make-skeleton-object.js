const path = require('path');
const chp = require('child_process');
require('dotenv').config()

const terminalPassword = process.env.TERMINAL_PASSWORD;
const projectsPath = path.join(__dirname, '..', '..', '..', '..', 'project');
const appsPath = path.join(__dirname, '..', '..', '..', '..', 'apps');

const makeFlutterSkeleton = async (array) => {
  const project = array[0].project;
  
  console.info(`Check project folder existence`);
  try {
    chp.execSync(`[ -d "${appsPath}/${project.folder}" ]`);
    console.info(`${projectsPath}/${project.folder} already exists`);
    changeFultterSkeleton(array);
    return true;
  } catch (err) {
    try {
      console.info(`Install snap`);
      chp.execSync(`echo ${terminalPassword} | sudo -S apt-get install snapd --yes`);
      
      console.info(`Install flutter`);
      chp.execSync(`echo ${terminalPassword} | sudo -S snap remove flutter`);
      chp.execSync(`echo ${terminalPassword} | sudo -S snap install flutter --classic`);
      chp.execSync(`flutter --version`);
      const sdkPath = chp.execSync(`find ~/ -type d -name 'bin' 2>/dev/null | grep 'flutter/bin'`).toString().split('flutter/bin')[0];
      const bashrcContent = chp.execSync(`cat $HOME/.bashrc`).toString();
      const str = `export PATH="$PATH:${sdkPath}flutter/bin"`;
      
      if (!bashrcContent.includes(str)) {
        chp.execSync(`\n echo '${str}' >> $HOME/.bashrc`);
      }

      console.info(`Create new flutter app "${project.folder}"`);
      chp.execSync(`flutter create ${appsPath}/${project.folder}`);
      console.info(`${appsPath}/${project.folder} created`);
      console.info(`Create components folder`);
      chp.execSync(`mkdir ${appsPath}/${project.folder}/lib/components`);
      console.info(`${appsPath}/${project.folder}/src/app/components created`);
      console.info(`Create modules folder`);
      chp.execSync(`mkdir ${appsPath}/${project.folder}/lib/modules`);
      console.info(`${appsPath}/${project.folder}/src/app/modules created`);
      return true;
    } catch (error) {
      console.warn(error.message);
      return error.message;
    }
  }
}

const changeFultterSkeleton = (array) => {
  
}

module.exports = {
  makeFlutterSkeleton
}