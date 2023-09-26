const attributes = require("./utils/form-attribute");

const createInputCode = async (project,object, element) => {
  const attribute = attributes.setAttribute(element);
  const isRequiredString = `
  validator: (value) {
    if (value == null || value.isEmpty) {
      return 'Please enter ${attribute.dataType}';
    }
    return null;
  },
  `;
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
        if (attribute.tooltip) {
          code += `
          Padding(
            padding: const EdgeInsets.only(bottom: 30),
            child: Tooltip(
              message: "${attribute.tooltip}",
              child: TextFormField(
                controller: ${attribute.name}Controller,${isRequiredString}
                decoration: InputDecoration(
                  labelText: "${attribute.label}",
                  hintText: "${attribute.placeholder}",
                ),
              ),
            ),
          ),
          `;
        } else {
          code += `
          Padding(
            padding: const EdgeInsets.only(bottom: 30),
            child: TextFormField(
              controller: ${attribute.name}Controller,${isRequiredString}
              decoration: InputDecoration(
                labelText: "${attribute.label}",
                hintText: "${attribute.placeholder}",
              ),
            ),
          ),
          `;
        }
      }
      break;
  }
  
  return code;
};

module.exports = {
  createInputCode
}