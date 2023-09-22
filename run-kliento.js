const {rapida} = require("./index.js");

const project = {
  folder: "kliento",
  title: "Kliento",
  frontendFramework: "flutter",
  backendFramework: "loopback",
  ui: "material",
  documentations: ["dokumentado"],
  description: "CRM genérico."
};

rapida.startRapida(project);