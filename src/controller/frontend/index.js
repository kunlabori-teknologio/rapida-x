const { makeAngularSkeleton } = require('./angular/01-make-skeleton-object');
const { makeAngularCode } = require('./angular/02-make-code-object');
const { makeAngularFiles } = require('./angular/03-make-files-array_of_objects');
const { matchAngularFilesAndCodes } = require('./angular/04-match-files_and_codes');
const { makeFlutterSkeleton } = require('./flutter/01-make-skeleton-object');

let code = '';

const createFrontendFramework = async(array) => {
  switch (array[0].project.frontendFramework) {
    case 'angular':
      angular(array);
      break;

    case 'flutter':
      flutter(array);
      break;
  
    default:
      break;
  }
}

const angular = async (array) => {
  await makeAngularSkeleton(array);
  const code = await makeAngularCode(array);
  makeAngularFiles(code);
  matchAngularFilesAndCodes(code);
  return false;
}

const flutter = async (array) => {
  await makeFlutterSkeleton(array);
  return false;  
  const code = await makeAngularCode(array);
  makeAngularFiles(code);
  matchAngularFilesAndCodes(code);
  return false;
}

const svelte = (array) => {
  
}

module.exports = {
  createFrontendFramework
}