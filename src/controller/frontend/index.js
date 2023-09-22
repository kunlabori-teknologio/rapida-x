const { makeAngularSkeleton } = require('./angular/01-make-skeleton-object');
const { makeAngularCode } = require('./angular/02-make-code-object');
const { makeAngularFiles } = require('./angular/03-make-files-array_of_objects');
const { matchAngularFilesAndCodes } = require('./angular/04-match-files_and_codes');
const { makeFlutterSkeleton } = require('./flutter/01-make-skeleton-object');
const { makeFlutterCode } = require('./flutter/02-make-code-object');
const { makeFlutterFiles } = require('./flutter/03-make-files-array_of_objects');
const { matchFlutterFilesAndCodes } = require('./flutter/04-match-files_and_codes');

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
  const code = await makeFlutterCode(array);
  // makeFlutterFiles(code);
  matchFlutterFilesAndCodes(code);
  return false;
}

const svelte = (array) => {
  
}

module.exports = {
  createFrontendFramework
}