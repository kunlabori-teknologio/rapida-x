const makeDokumentadoCode = async (formattedArray) => {
  const project = formattedArray.project;
  return `<html><head><title>${project.title}</title></head><body><h1>${project.title}</h1>${codeModules(formattedArray)}</body></html>`;
};

codeModules = (formattedArray) => {
  const modules = formattedArray.modules;
  
  let code = "";

  for (let i = 0; i < modules.length; i++) {
    const module = modules[i];
    const moduleComponents = module.components;

    code += `<h2>${module.title}</h2>`;
    for (let j = 0; j < moduleComponents.length; j++) {
      const moduleComponent = moduleComponents[j];
      code += codeComponents(formattedArray, moduleComponent);
    }
  }

  return code;
};

const codeComponents = (formattedArray, moduleComponent) => {
  const components = formattedArray.components;
  let code = "";
  
  for (let i = 0; i < components.length; i++) {
    const component = components[i];
    
    if (moduleComponent === component.id) {
      code += `<h3>${component.title}</h3>${codeElements(component.elements)}`;
    }
  }

  return code;
};

const codeElements = (elements, isArray = false) => {
  let code = "";

  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];

    if (element.elementType === "tab") {
      const tabs = element.tabs;
      for (let j = 0; j < tabs.length; j++) {
        const tab = tabs[j];
        
        code += `<h4>${tab.title}: ${element.elementType}</h4>${codeElements(tab.elements)}`;
      }
    } else if (element.elementType === "array") {
      code += `<h5>${element.title}: ${element.elementType}</h5>${codeElements(element.elements, true)}`;
      
    } else {
      if (isArray) {
        code += `<h6>${element.label}: ${element.elementType}${element.isRequired ? "*" : ""}</h6>`;
      } else {
        code += `<h5>${element.label}: ${element.elementType}${element.isRequired ? "*" : ""}</h5>`;
      }
    }
  }

  return code;
}

module.exports = {
  makeDokumentadoCode
}