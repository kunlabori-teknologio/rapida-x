const setAttribute = (element) => {
  return {
    id: element.name,
    dataType: element.dataType,
    name: element.name,
    label: element.label,
    tooltip: element.tooltip ? `matTooltip="${element.tooltip}"` : "",
    placeholder: element.placeholder
      ? `placeholder="${element.placeholder}"`
      : "",
    isRequired: element.isRequired ? "required" : "",
    conditions: element.conditions ? `*ngIf="${element.name}Condition"` : "",
    validators: element.validators, // TO-DO
    value: element.value ? element.value : "",
    width: element.width ? element.width : "",
    isDisabled: element.isDisabled ? "disabled" : "",
    isAutoFocus: element.isAutoFocus ? element.isAutoFocus : "",
    // callMethod: element.apiRequest ? setCallToMethodOnFocus(input, mappedArrayInInput) : "",
    mask: element.mask ? element.mask : "",
    isMultipleLines: element.isMultipleLines,
    multiple: element.multiple ? "multiple" : "",
  };
  // const arrayId = mappedArrayInInput ? mappedArrayInInput[mappedArrayInelement.length - 1].name : undefined;
};

module.exports = {
  setAttribute,
};
