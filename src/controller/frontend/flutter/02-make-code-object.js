// const {
//   createFlutterControllerFormCodeOverProjectUi,
// } = require("./form/<ui>/controller");
// const {
//   createFlutterTemplateFormCodeOverProjectUi,
// } = require("./form/material/template");
// const {
//   createFlutterControllerTableCodeOverProjectUi,
// } = require("./table/controller");
// const {
//   createFlutterTemplateTableCodeOverProjectUi,
// } = require("./table/template");

const makeFlutterCode = async (arrayOfProjectObjects) => {
  const components = [];
  const modules = [];

  // for (let i = 0; i < arrayOfProjectObjects.length; i++) {
  //   const objectFromProject = arrayOfProjectObjects[i];

  //   if (!objectFromProject.modules && !objectFromProject.project) {
  //     components.push({
  //       id: objectFromProject.id,
  //       title: objectFromProject.title,
  //       type: objectFromProject.type,
  //       templateCode: await createTemplateCodeOverObject(arrayOfProjectObjects, objectFromProject),
  //       controllerCode: await createControllerCodeOverObject(arrayOfProjectObjects, objectFromProject),
  //     });
  //   }

  // if (objectFromProject.modules) {
  //   for (let j = 0; j < objectFromProject.modules.length; j++) {
  //     const module = objectFromProject.modules[j];
  //     modules.push(module);
  //   }
  // }
  // }

  return { project: arrayOfProjectObjects[0].project, components, modules };
};

const createTemplateCodeOverObject = async (array, object) => {
  const project = array[0].project;
  let code = "";
  switch (object.type) {
    case "form":
      if (project.ui === "material")
        code += await createFlutterTemplateFormCodeOverProjectUi(
          project,
          object
        );
      break;

    case "table":
      if (project.ui === "material")
        code += await createFlutterTemplateTableCodeOverProjectUi(
          project,
          object
        );
      break;
    default:
      console.error(`${object.type} is not an expected type to origin object.`);
      break;
  }

  return code;
};

const createControllerCodeOverObject = async (array, object) => {
  const project = array[0].project;
  let code = "";
  switch (object.type) {
    case "form":
      if (project.ui === "material")
        code += await createFlutterControllerFormCodeOverProjectUi(
          project,
          object
        );
      break;

    case "table":
      if (project.ui === "material")
        code += await createFlutterControllerTableCodeOverProjectUi(
          project,
          object
        );
      break;
    default:
      break;
  }

  return code;
};

module.exports = {
  makeFlutterCode,
};
