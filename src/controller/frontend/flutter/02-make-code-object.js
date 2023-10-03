const { string }  = require("kunla-utils");
// const {
//   createFlutterControllerFormCodeOverProjectUi,
// } = require("./form/<ui>/controller");
const {
  createFlutterTemplateFormCodeOverMaterialUi, createFlutterFormElementsDeclarationCode,
} = require("./form/material/template");
// const {
//   createFlutterControllerTableCodeOverProjectUi,
// } = require("./table/controller");
// const {
//   createFlutterTemplateTableCodeOverProjectUi,
// } = require("./table/template");

const makeFlutterCode = async (arrayOfProjectObjects) => {
  const components = [];
  const modules = [];

  for (let i = 0; i < arrayOfProjectObjects.length; i++) {
    const objectFromProject = arrayOfProjectObjects[i];

    if (!objectFromProject.modules && !objectFromProject.project) {
      components.push({
        id: objectFromProject.id,
        title: objectFromProject.title,
        type: objectFromProject.type,
        templateCode: await createTemplateCodeOverObject(
          arrayOfProjectObjects,
          objectFromProject
        ),
        // controllerCode: await createControllerCodeOverObject(
        //   arrayOfProjectObjects,
        //   objectFromProject
        // ),
      });
    }

    // if (objectFromProject.modules) {
    //   for (let j = 0; j < objectFromProject.modules.length; j++) {
    //     const module = objectFromProject.modules[j];
    //     modules.push(module);
    //   }
    // }
  }
  
  return { project: arrayOfProjectObjects[0].project, components, modules };
};

const createTemplateCodeOverObject = async (array, object) => {
  const project = array[0].project;
  let code = "";
  switch (object.type) {
    case "form":
      if (project.ui === "material")
        formElementDeclarationCode = formElementsDeclarationCode = createFlutterFormElementsDeclarationCode(project, object);      
        // formElementsinitializationCode = await createFlutterFormElementsInitializationCode(project, object);
        // formElementsDisposeCode = await createFlutterFormElementsDeclarationCode(project, object);
        formCode = await createFlutterTemplateFormCodeOverMaterialUi(
          project,
          object
        );
        
        code = `
        class _${string.pascalfy(object.id)}State extends State<${string.pascalfy(object.id)}> {
          final _${object.id}Key = GlobalKey<FormState>();
          ${formElementDeclarationCode}
        
          @override
          void dispose() {
            firstInputController.dispose();
            super.dispose();
          }
        
          void initState() {
            super.initState();
            firstInputController = TextEditingController();
          }
        
          Widget build(BuildContext context) {
            return Form(
              key: _${object.id}Key,
              child: Column(
                children: [
                  ${formCode}
                ],
              )
            );
          }
        }
        `
      break;

    // case "table":
    //   if (project.ui === "material")
    //     code += await createFlutterTemplateTableCodeOverProjectUi(
    //       project,
    //       object
    //     );
    //   break;
    default:
      console.error(`${object.type} is not an expected type to origin object.`);
      break;
  }
  console.log(code, 100);
  return false;
  return code;
};

const createControllerCodeOverObject = async (array, object) => {
  const project = array[0].project;
  let code = "";
  switch (object.type) {
    case "form":
      if (project.ui === "material")
        code += await createFlutterControllerFormCodeOverProjectUi(
          project,
          object
        );
      break;

    case "table":
      if (project.ui === "material")
        code += await createFlutterControllerTableCodeOverProjectUi(
          project,
          object
        );
      break;
    default:
      break;
  }

  return code;
};

module.exports = {
  makeFlutterCode,
};
