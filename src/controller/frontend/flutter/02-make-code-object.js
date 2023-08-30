const { createFrameworkControllerFormCodeOverProjectUi } = require('./form/<ui>/controller');
const { createFrameworkTemplateFormCodeOverProjectUi } = require('./form/material/template');
const { createFrameworkControllerTableCodeOverProjectUi } = require('./table/controller');
const { createFrameworkTemplateTableCodeOverProjectUi } = require('./table/template');

const makeFrameworkCode = async (arrayOfProjectObjects) => {
  const components = [];
  const modules = [];
  
  for (let i = 0; i < arrayOfProjectObjects.length; i++) {
    const objectFromProject = arrayOfProjectObjects[i];

    if (!objectFromProject.modules && !objectFromProject.project) {      
      components.push({
        id: objectFromProject.id,
        title: objectFromProject.title,
        type: objectFromProject.type,
        templateCode: await createTemplateCodeOverObject(arrayOfProjectObjects, objectFromProject),
        controllerCode: await createControllerCodeOverObject(arrayOfProjectObjects, objectFromProject),
      });
    }
    
    if (objectFromProject.modules) {
      for (let j = 0; j < objectFromProject.modules.length; j++) {
        const module = objectFromProject.modules[j];
        modules.push(module);
      }
    }
  }

  return {project: arrayOfProjectObjects[0].project, components, modules};
}

const createTemplateCodeOverObject = async (array, object) => {
  const project = array[0].project; 
  let code = '';
  switch (object.type) {
    case 'form':
      if (project.ui === 'projectUi')
        code += await createFrameworkTemplateFormCodeOverProjectUi(project, object);
      break;

    case 'table':
      if (project.ui === 'projectUi')
        code += await createFrameworkTemplateTableCodeOverProjectUi(project, object);
      break;
    default:
      console.error(`${object.type} is not an expected type to origin object.`);
      break;
  }
  
  return code;
}

const createControllerCodeOverObject = async (array, object) => {
  const project = array[0].project; 
  let code = '';
  switch (object.type) {
    case 'form':
      if (project.ui === 'projectUi')
        code += await createFrameworkControllerFormCodeOverProjectUi(project, object);
      break;

    case 'table':
      if (project.ui === 'projectUi')
        code += await createFrameworkControllerTableCodeOverProjectUi(project, object);
      break;
    default:
      break;
  }
  
  return code;
}

module.exports = {
  makeFrameworkCode
}