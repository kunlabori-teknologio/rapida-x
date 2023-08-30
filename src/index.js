const { makeProjectObject } = require("../utils/make-object-project_path");
const { createDocumentation } = require("./controller/documentation");
const { createFrontendFramework } = require("./controller/frontend");

const startRapida = async (project) => {
  const array = await makeProjectObject(project);
console.log(project.documentations, 7)
  if (project.frontendFramework) {
    console.info(`Preparing frontend code with ${project.frontendFramework}`);
    createFrontendFramework(array);
  }

  if (project.documentations) {
    console.info(`Preparing documentation code`);
    createDocumentation(array);
  }
}

module.exports = {
  startRapida
}