const path = require('path');
const chp = require('child_process');
const fs = require('fs');
require('dotenv').config()

const terminalPassword = process.env.TERMINAL_PASSWORD;
const projectsPath = path.join(__dirname, '..', '..', '..', '..', 'project');
const appsPath = path.join(__dirname, '..', '..', '..', '..', 'apps');
const pathToTempDownload = path.join(__dirname, '..', '..', '..', '..', 'temp_downloads');
const makeFlutterSkeleton = async (array) => {
  const project = array[0].project;
  
  console.info(`Check project folder existence`);
  try {
    chp.execSync(`[ -d "${appsPath}/${project.folder}" ]`);
    console.info(`${projectsPath}/${project.folder} already exists`);

    return true;
  } catch (err) {
    try {
      const openJdkVersion = await fetchMaxOpenJdkVersion();
      const androidSdkLatestVersion = await fetchLatestAndroidSdkManagerVersion();
      
      console.info(`Install snap`);
      chp.execSync('echo ${terminalPassword} | sudo -S apt-get install snapd --yes');
      
      console.info(`Install flutter`);
      // chp.execSync(`echo ${terminalPassword} | sudo -S snap remove flutter`);
      // chp.execSync(`echo ${terminalPassword} | sudo -S snap install flutter --classic`);
      chp.execSync(`flutter --version`);
      const sdkPath = chp.execSync(`find ~/ -type d -name 'bin' 2>/dev/null | grep 'flutter/bin'`).toString().split('flutter/bin')[0];
      const bashrcContent = chp.execSync(`cat $HOME/.bashrc`).toString();
      const str = `export PATH="$PATH:${sdkPath}flutter/bin"`;
      const regex =  new RegExp(str);
      
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

const puppeteer = require('puppeteer');

const fetchLatestAndroidSdkManagerVersion = async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto('https://developer.android.com/studio#downloads');

    // This selector might need adjustment based on the website's current structure
    const link = await page.$eval('a[href*="commandlinetools-linux"]', el => el.href);

    const versionPattern = /commandlinetools-linux-(\d+)_latest\.zip/;
    const match = link.match(versionPattern);

    await browser.close();

    if (match && match[1]) {
        return match[1];
    }

    throw new Error('Failed to extract the version.');
}

const fetchMaxOpenJdkVersion = async () => {
  const command = chp.execSync(`apt-cache search openjdk | grep -E '^openjdk-[0-9]+-jdk'`);
  const string = command.toString();
  const regex = /openjdk-(\d+)-jdk/g;

  let match;
  let versions = [];
  
  while ((match = regex.exec(string)) !== null) {
      versions.push(parseInt(match[1], 10));
  }
  
  return Math.max(...versions);
}

module.exports = {
  makeFlutterSkeleton
}