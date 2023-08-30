const { formatDokumentado } = require("./dokumentado/01-format-object");
const { makeDokumentadoCode } = require("./dokumentado/02-make-code-object");

let code = '';

const createDocumentation = async(array) => {
  const documentations = array[0].project.documentations;

  for (let i = 0; i < documentations.length; i++) {
    const documentation = documentations[i];
    
    switch (documentation) {
      case 'dokumentado':
        dokumentado(array);
        break;
  
      case 'c4':
        c4(array);
        break;

      case 'uml':
        uml(array);
        break;
    
      default:
        break;
    }
  }

}

const dokumentado = async (array) => {
  const formattedArray = await formatDokumentado(array);
  const code = await makeDokumentadoCode(formattedArray);
  console.log(code, 35);
  return false;
}

const c4 = async (array) => {

}

const uml = async (array) => {

}

module.exports = {
  createDocumentation
}