const { createInputCode } = require("./input");
const { createRadioCode } = require("./radio");
const { createSelectCode } = require("./select");
const { createTabCode } = require("./tab");
const { createWysiwygCode } = require("./wysiwyg");

const mapElementTypeToCreateCode = {
  input: createInputCode,
  radio: createRadioCode,
  select: createSelectCode,
  tab: createTabCode,
  wysiwyg: createWysiwygCode,
};

const createArrayCode = async (project, element) => {
  const arrayOfElements = element.elements.reduce(
    (accumulator, currentValue) => {
      const createCode = mapElementTypeToCreateCode[currentValue.elementType];

      accumulator += createCode(project, currentValue);

      return accumulator;
    },
    ``
  );

  return `
    <ng-container [formGroup]="${element.name}Form">
      ${arrayOfElements}
    </ng-container>
  `;
};

module.exports = {
  createArrayCode,
};
