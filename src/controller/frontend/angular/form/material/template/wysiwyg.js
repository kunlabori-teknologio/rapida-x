const attributes = require("./utils/form-attribute");

const createWysiwygCode = async (project, element) => {
  const attribute = attributes.setAttribute(element);

  return `
  
  `;
}

module.exports = {
  createWysiwygCode
}