const path = require('path');
const chp = require('child_process');
const { kebabfy } = require('kunla-utils/src/controller/utils/string');

const makeAngularFiles = (code) => {
  const appPath = path.join(__dirname, '..', '..', '..', '..', 'apps', code.project.folder);
  
  for (let i = 0; i < code.components.length; i++) {
    const component = code.components[i];
    const objectId = component.id;
    const objectIdKebab = kebabfy(objectId);
    
    chp.execSync(
      `rm -Rf src/app/components/${objectIdKebab} && ng generate c components/${objectIdKebab} --skip-import`,
      { cwd: appPath }
    );
  }

  for (let i = 0; i < code.modules.length; i++) {
    const module = code.modules[i];
    const objectId = module.id;
    const objectIdKebab = kebabfy(objectId);

    chp.execSync(
      `rm -Rf src/app/modules/${objectIdKebab} && ng generate m modules/${objectIdKebab} --routing --routing-scope Child`,
      { cwd: appPath }
    );

    chp.execSync(
      `ng generate c modules/${objectIdKebab} --module modules/${objectIdKebab}`,
      { cwd: appPath }
    );
  }
}

module.exports = {
  makeAngularFiles
}