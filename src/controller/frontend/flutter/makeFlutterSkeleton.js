const chp = require("child_process");
const {
  appsPath,
  projectsPath,
  installerCommand,
  isLinux,
  needsSudoString,
} = require("./01-make-skeleton-object");

const makeFlutterSkeleton = async (array) => {
  const project = array[0].project;

  console.info(`Check project folder existence`);
  try {
    chp.execSync(`[ -d "${appsPath}/${project.folder}" ]`);
    console.info(`${projectsPath}/${project.folder} already exists`);

    return true;
  } catch (err) {
    try {
      console.info(`Install snap`);
      chp.execSync(
        `${installerCommand} install snap${isLinux ? "d --yes" : ""}`
      );

      console.info(`Install flutter`);
      // chp.execSync(`${needsSudoString}snap uninstall flutter`);
      chp.execSync(`${needsSudoString}snap install flutter --classic`);
      chp.execSync(`flutter --version`);
      const sdkPath = chp
        .execSync(
          `find ~/ -type d -name 'bin' 2>/dev/null | grep 'flutter/bin'`
        )
        .toString()
        .split("flutter/bin")[0];
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
};
