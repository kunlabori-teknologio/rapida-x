let parentArray = [];

const makeDokumentadoCode = async (formattedArray) => {
  const project = await formattedArray.project;  
  const code = `<html><head><title>${project.title}</title></head><body><h1>${project.title}</h1>${await codeModules(formattedArray)}</body></html>`;
  
  return {project, code};
};

codeModules = async (formattedArray) => {
  const modules = formattedArray.modules;
  
  let code = "";

  for (let i = 0; i < modules.length; i++) {
    const module = modules[i];
    
    code += `<h2>${module.title}</h2>`;
    
    if (module.components) {      
      const moduleComponents =  module.components;
      for (let j = 0; j < moduleComponents.length; j++) {
        const moduleComponent = moduleComponents[j];
        code += await codeComponents(formattedArray, moduleComponent);
      }
    }
  }
  
  return code;
};

const codeComponents = async (formattedArray, moduleComponent) => {
  const components = formattedArray.components;
  let code = "";
  
  for (let i = 0; i < components.length; i++) {
    const component = components[i];
    
    if (moduleComponent === component.id) {
      code += `<h3>${component.title}</h3>${await codeElements(component.elements)}`;
    }
  }
  
  return code;
};

const codeElements = async (elements, parentArrayId = null) => {
  let code = "";
  
  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];

    if (element.elementType === "tab") {
      const tabs = element.tabs;
      
      
      for (let j = 0; j < tabs.length; j++) {
        const tab = tabs[j];
        parentArray = [];
        
        code += `<h4>${tab.title}: ${element.elementType}</h4>${await codeElements(tab.elements)}`;
      }
    } else if (element.elementType === "array") {
      parentArray.push(element.id);
      code += await dealWithArray(element, elements);      
    } else {
      if (parentArrayId) {
        code += `<h6>${element.label}: ${element.elementType}${element.isRequired ? "*" : ""} (${parentArray.map(name => name)})</h6>`;
      } else {
        parentArray = [];
      
        code += `<h5>${element.label}: ${element.elementType}${element.isRequired ? "*" : ""}</h5>`;
      }
    }
  }
  
  return code;
}

const dealWithArray = async (arrayElement, elements) => {
  let code = "";
  code += `<h5>${arrayElement.title}: ${arrayElement.elementType}</h5>`;
  code += await codeElements(arrayElement.elements, arrayElement.id);

  return code;
}

module.exports = {
  makeDokumentadoCode
}