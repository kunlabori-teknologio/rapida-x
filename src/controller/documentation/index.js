const { formatDokumentado } = require("./dokumentado/01-format-object");
const { makeDokumentadoCode } = require("./dokumentado/02-make-code-object");
const { makeDokumentadoFiles } = require("./dokumentado/03-make-files-array_of_objects");
const { matchDokumentadoFilesAndCodes } = require("./dokumentado/04-match-files_and_codes");

let code = '';

const createDocumentation = async(array) => {
  const documentations = array[0].project.documentations;

  for (let i = 0; i < documentations.length; i++) {
    const documentation = documentations[i];
    
    switch (documentation) {
      case 'dokumentado':
        return await dokumentado(array);
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
  
  makeDokumentadoFiles(code);
  matchDokumentadoFilesAndCodes(code);
}

const c4 = async (array) => {

}

const uml = async (array) => {

}

module.exports = {
  createDocumentation
}