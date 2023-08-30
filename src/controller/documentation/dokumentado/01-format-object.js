const formatDokumentado = async (arrayOfProjectObjects) => {
  const components = [];
  const modules = [];
  
  for (let i = 0; i < arrayOfProjectObjects.length; i++) {
    const objectFromProject = arrayOfProjectObjects[i];

    if (!objectFromProject.modules && !objectFromProject.project) {      
      components.push({
        id: objectFromProject.id,
        title: objectFromProject.title,
        type: objectFromProject.type,
        elements: objectFromProject.elements
      });
    }
    
    if (objectFromProject.modules) {
      for (let j = 0; j < objectFromProject.modules.length; j++) {
        const module = objectFromProject.modules[j];
        modules.push(module);
      }
    }
  }

  return {project: arrayOfProjectObjects[0].project, components, modules};
}

module.exports = {
  formatDokumentado
}