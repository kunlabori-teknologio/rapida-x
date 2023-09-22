const { makeProjectObject } = require("../utils/make-object-project_path");
const { createDocumentation } = require("./controller/documentation");
const { createFrontendFramework } = require("./controller/frontend");

const startRapida = async (project) => {
  const array = await makeProjectObject(project);
  
  if (project.frontendFramework) {
    console.info(`Preparing frontend code with ${project.frontendFramework}`);
    createFrontendFramework(array);
  }

  if (project.documentations) {
    console.info(`Preparing documentation code`);
    const code = await createDocumentation(array);
  }
}

module.exports = {
  startRapida
}