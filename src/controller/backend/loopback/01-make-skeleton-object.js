const path = require("path");
const chp = require("child_process");
const projectsPath = path.join(__dirname, "..", "..", "..", "..", "project");
const appsPath = path.join(__dirname, "..", "..", "..", "..", "apps");

const makeLoopbackSkeleton = async (array) => {
  // const project = array[0].project;
  const project = {
    folder: "rapida",
    backendFramework: "loopback",
    name: "rapida",
    description: "rapida",
    version: "1.0.0",
  };

  console.info(`Check project folder existence`);
  try {
    chp.execSync(`[ -d "${appsPath}/${project.folder}" ]`);
    console.info(`${projectsPath}/${project.folder} already exists`);

    return true;
  } catch (err) {
    try {
      console.info(`Install nvm`);
      chp.execSync(
        "curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash"
      );
      chp.execSync(
        'export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"'
      );
      chp.execSync('[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"');

      console.info(`Install node lts`);
      chp.execSync('/bin/bash -c "source ~/.nvm/nvm.sh && nvm install --lts"');
      console.info(`Install loopback`);
      chp.execSync(
        "npm uninstall -g @loopback/cli && npm cache clean --force && npm cache verify && npm install -g @loopback/cli"
      );
      console.info(`Create new loopback app "${project.folder}"`);
      chp.execSync(`lb4 app ${project.folder} --skip-install -y`);
      chp.execSync(
        `cd '${project.folder}' && npm i --save-dev @types/mocha && npm i --save`
      );
      // console.info(`${projectsPath}/${project.folder} created`);
      // console.info(`Create components folder`);
      // chp.execSync(`mkdir ${appsPath}/${project.folder}/src/app/components`);
      // console.info(`${appsPath}/${project.folder}/src/app/components created`);
      // console.info(`Create modules folder`);
      // chp.execSync(`mkdir ${appsPath}/${project.folder}/src/app/modules`);
      // console.info(`${appsPath}/${project.folder}/src/app/modules created`);
      return true;
    } catch (error) {
      console.warn(error.message);
      return error.message;
    }
  }
};

makeLoopbackSkeleton();
// module.exports = {
//   makeLoopbackSkeleton,
// };
