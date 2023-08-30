const attributes = require("./utils/form-attribute");

const createInputCode = async (project,object, element) => {
  const attribute = attributes.setAttribute(element);
  
  let code = "";

  // Skeleton
  switch (attribute.dataType) {
    case "file":
      code += ``;
      break;

    case "date":
      code += ``;
      break;
  
    default:
      if (attribute.isMultipleLines) {

      }

      if (!attribute.isMultipleLines) {
        code += ``;
      }
      break;
  }
  
  return code;
};

module.exports = {
  createInputCode
}