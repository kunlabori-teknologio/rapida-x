const {rapida} = require("./index.js");

const project = {
  folder: "managero",
  title: "Manaĝero",
  frontendFramework: "flutter",
  backendFramework: "loopback",
  ui: "material",
  documentations: ["dokumentado"],
  description: "CMS simples e genérico que relaciona Conteúdos a Páginas e Páginas a Projetos."
};

rapida.startRapida(project);