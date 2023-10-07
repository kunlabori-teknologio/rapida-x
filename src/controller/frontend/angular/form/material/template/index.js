const { createAutocompleteCode } = require("./autocomplete");
const { createCheckboxCode } = require("./checkbox");
const { createInputCode } = require("./input");
const { createRadioCode } = require("./radio");
const { createSelectCode } = require("./select");
const { createWysiwygCode } = require("./wysiwyg");

let parentArray = [];

const createAngularTemplateFormCodeOverMaterialUi = async (project, object, parentArrayId = null) => {
  let templateCode = '';
  for (let i = 0; i < object.elements.length; i++) {
    const element = object.elements[i];
    switch (element.elementType) {
      case "autocomplete":
        templateCode += await createAutocompleteCode(project, object, element);
        break;
  
      case "checkbox":
        templateCode += await createCheckboxCode(project, object, element);
        break;
      
      case "input":
        templateCode += await createInputCode(project, object, element, parentArrayId);
        break;
      
      case "radio":
        templateCode += await createRadioCode(project, object, element);
        break;
  
      case "select":
        templateCode += await createSelectCode(project, object, element);
        break;
  
      case "tab":
        for (let j = 0; j < element.tabs.length; j++) {
          const tab = element.tabs[j];
          parentArray = [];
          
          templateCode += await createAngularTemplateFormCodeOverMaterialUi(project, tab);
        }
        break;

      case "array":
        parentArray.push(element.id);
        templateCode += await createAngularTemplateFormCodeOverMaterialUi(project, element, element.id);
        break;
  
      case "wysiwyg":
        templateCode += await createWysiwygCode(project, object, element);
        break;
  
      default:
        console.error(`There is no such kind of element: ${element.elementType}`)
        break;
    }

    return templateCode;
  } 
};

const dealWithArray = async (arrayElement, elements) => {
  let code = "";
  code += await codeElements(arrayElement.elements, arrayElement.id);

  return code;
}

module.exports = {
  createAngularTemplateFormCodeOverMaterialUi
}