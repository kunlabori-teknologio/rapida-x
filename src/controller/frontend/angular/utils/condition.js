const setCondition = (element) => {
  if (element.isTriggerToCondition) {
    let setCondition = "";
    switch (element.elementType) {
      case "select":
        setCondition += `(selectionChange)="`;
        break;
    
      default:
        console.warn("This type of element does not set condition (yet(?))");
        return false;
        break;
    }
    if (array) {
      setCondition += `setConditionIn${TextTransformation.pascalfy(
        element.name
      )}(${getParentsIndexes}${getParentsIndexes && getParentsIndexes !== "" ? ", " : ""
        }${array
          ? `${arrayIdSingular}Index, `
          : ``
        })`;
    }

    if (!array) {
      setCondition += `setCondition()`;
    }
    setCondition += `"`;
  }
}

module.exports = {
  setCondition
}