const { createAutocompleteCode } = require("./autocomplete");
const { createCheckboxCode } = require("./checkbox");
const { createInputCode } = require("./input");
const { createRadioCode } = require("./radio");
const { createSelectCode } = require("./select");
const { createWysiwygCode } = require("./wysiwyg");

let formElementDeclarationCode = '';
let formElementsinitializationCode = '';
let formElementsDisposeCode = '';
let templateCode = '';

const createFlutterTemplateFormCodeOverMaterialUi = async (project, object, isTabOrArray = false) => {
  for (let i = 0; i < object.elements.length; i++) {
    const element = object.elements[i];
    switch (element.elementType) {
      // case "autocomplete":
      //   templateCode += await createAutocompleteCode(project, object, element);
      //   break;
  
      // case "checkbox":
      //   templateCode += await createCheckboxCode(project, object, element);
      //   break;
      
      case "input":
        templateCode += await createInputCode(project, object, element);
        break;
      
      // case "radio":
      //   templateCode += await createRadioCode(project, object, element);
      //   break;
  
      // case "select":
      //   templateCode += await createSelectCode(project, object, element);
      //   break;
  
      // case "tab":
      //   for (let j = 0; j < element.tabs.length; j++) {
      //     const tab = element.tabs[j];
          
      //     templateCode += await createFlutterTemplateFormCodeOverMaterialUi(project, tab);
      //   }
      //   break;
  
      // case "wysiwyg":
      //   templateCode += await createWysiwygCode(project, object, element);
      //   break;
  
      default:
        console.error(`There is no such kind of element: ${element.elementType}`)
        break;
    }
  } 
  return templateCode;
};

const createFlutterFormElementsPresetCode = (project, object, isTabOrArray = false) => {
  if (!isTabOrArray) {
    formElementDeclarationCode = '';
    formElementsinitializationCode = '';
    formElementsDisposeCode = '';
  }
  for (let i = 0; i < object.elements.length; i++) {
    const element = object.elements[i];
    switch (element.elementType) {
      // case "autocomplete":
      //   formElementDeclarationCode += await createAutocompleteCode(project, object, element);
      //   break;
      
      case "input":
        formElementDeclarationCode += `
          late final TextEditingController ${element.name}Controller;`;
        formElementsinitializationCode += `
            ${element.name}Controller = TextEditingController();`;
        formElementsDisposeCode += `
            ${element.name}Controller.dispose();`;
        break;
  
      // case "select":
      //   formElementDeclarationCode += await createSelectCode(project, object, element);
      //   break;
  
      case "tab":
        for (let j = 0; j < element.tabs.length; j++) {
          const tab = element.tabs[j];
          createFlutterFormElementsPresetCode(project, tab, true);
        }
        break;

      case "array":
        createFlutterFormElementsPresetCode(project, element, true);
        break;
      // case "wysiwyg":
      //   formElementDeclarationCode += await createWysiwygCode(project, object, element);
      //   break;
  
      default:
        console.error(`There is no such kind of element: ${element.elementType}`)
        break;
    }
  }
  return {formElementDeclarationCode, formElementsinitializationCode, formElementsDisposeCode};
};

module.exports = {
  createFlutterTemplateFormCodeOverMaterialUi,
  createFlutterFormElementsPresetCode,
}