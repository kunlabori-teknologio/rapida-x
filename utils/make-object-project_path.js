const path = require('path');
const chp = require('child_process');
const fs = require('fs');
const utils = require("kunla-utils");
const { setIdToPropertyName } = require('kunla-utils/src/controller/utils/string');
const projectsPath = path.join(__dirname, "..", "project");

const makeProjectObject = async (project) => {
  const filesInProjectFolderToSetParams = utils.array.createArrayOverFolderFiles(
    `${projectsPath}/${project.folder}`
  );
  
  const result = [];
  result[0] = {project};
  for (let i = 0; i < filesInProjectFolderToSetParams.length; i++) {
    const file = filesInProjectFolderToSetParams[i];
    
    if (file != '') {
      const string = fs.readFileSync(`${projectsPath}/${project.folder}/${file}`, "utf8");

      if (file.split('.')[0] === 'modules' && file.split('.')[1] === 'json') {
        const object = {...JSON.parse(string)};

        result.push(object);
      } else if (file.split('.')[1] !== 'json') {
        const type = file.split('.')[1];
        const id = `${setIdToPropertyName(file.split('.')[0])}${utils.string.pascalfy(file.split('.')[1])}`;
        const object = {...JSON.parse(string), id, type};
        
        result.push(object);
      } else {
        console.info(`${file} is not a <id-to-object>.<object-type>.json file name.`);
      }
    }
  }
  
  return result;
}

module.exports = {
  makeProjectObject
}