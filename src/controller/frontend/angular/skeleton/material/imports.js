const path = require('path');
const chp = require('child_process');
const fs = require('fs');

const materialImports = (project) => {
  materialImportsToAppModule(project);
  materialImportsToMaterialModule(project);
  materialImportsToShared(project);
}

const materialImportsToAppModule = (project) => {
  const imports = {
    imports: `
    import { SharedModule } from './modules/shared/shared.module';
    `,
    importsInNgModule: `
    SharedModule,
    `
  }

  const codeToChangePath = path.join(
    __dirname, "..", "..", "..", "..", "..", "..",
    "apps", project.folder, "src", "app", "app.module.ts"
  );

  let codeToChange = fs.readFileSync(`${codeToChangePath}`, "utf8");
  
  codeToChange = codeToChange.replace(
    "import { NgModule } from '@angular/core';",
    `import { NgModule } from '@angular/core';
    ${imports.imports}`
  );
  codeToChange = codeToChange.replace(
    "imports: [",
    `imports: [
      ${imports.importsInNgModule}`
  );

  fs.writeFileSync(`${codeToChangePath}`, codeToChange, {
    encoding: "utf8",
    flag: "w",
  });
}

const materialImportsToMaterialModule = (project) => {
  const imports = {
  imports: `
  import {A11yModule} from '@angular/cdk/a11y';
  import {ClipboardModule} from '@angular/cdk/clipboard';
  import {DragDropModule} from '@angular/cdk/drag-drop';
  import {PortalModule} from '@angular/cdk/portal';
  import {ScrollingModule} from '@angular/cdk/scrolling';
  import {CdkStepperModule} from '@angular/cdk/stepper';
  import {CdkTableModule} from '@angular/cdk/table';
  import {CdkTreeModule} from '@angular/cdk/tree';
  import {MatAutocompleteModule} from '@angular/material/autocomplete';
  import {MatBadgeModule} from '@angular/material/badge';
  import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
  import {MatButtonModule} from '@angular/material/button';
  import {MatButtonToggleModule} from '@angular/material/button-toggle';
  import {MatCardModule} from '@angular/material/card';
  import {MatCheckboxModule} from '@angular/material/checkbox';
  import {MatChipsModule} from '@angular/material/chips';
  import {MatStepperModule} from '@angular/material/stepper';
  import {MatDatepickerModule} from '@angular/material/datepicker';
  import {MatDialogModule} from '@angular/material/dialog';
  import {MatDividerModule} from '@angular/material/divider';
  import {MatExpansionModule} from '@angular/material/expansion';
  import {MatGridListModule} from '@angular/material/grid-list';
  import {MatIconModule} from '@angular/material/icon';
  import {MatInputModule} from '@angular/material/input';
  import {MatListModule} from '@angular/material/list';
  import {MatMenuModule} from '@angular/material/menu';
  import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
  import {MatPaginatorModule} from '@angular/material/paginator';
  import {MatProgressBarModule} from '@angular/material/progress-bar';
  import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
  import {MatRadioModule} from '@angular/material/radio';
  import {MatSelectModule} from '@angular/material/select';
  import {MatSidenavModule} from '@angular/material/sidenav';
  import {MatSliderModule} from '@angular/material/slider';
  import {MatSlideToggleModule} from '@angular/material/slide-toggle';
  import {MatSnackBarModule} from '@angular/material/snack-bar';
  import {MatSortModule} from '@angular/material/sort';
  import {MatTableModule} from '@angular/material/table';
  import {MatTabsModule} from '@angular/material/tabs';
  import {MatToolbarModule} from '@angular/material/toolbar';
  import {MatTooltipModule} from '@angular/material/tooltip';
  import {MatTreeModule} from '@angular/material/tree';
  import {OverlayModule} from '@angular/cdk/overlay';`,
  importsInNgModule: `
    A11yModule,
    ClipboardModule,
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
    DragDropModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    OverlayModule,
    PortalModule,
    ScrollingModule,`
  }
  const codeToChangePath = path.join(
    __dirname, "..", "..", "..", "..", "..", "..", "apps", project.folder, "src", "app", "modules", "shared", "material.module.ts"
  );

  let codeToChange = fs.readFileSync(`${codeToChangePath}`, "utf8");

  codeToChange = codeToChange.replace(
  "import { NgModule } from '@angular/core';",
  `import { NgModule } from '@angular/core';
  ${imports.imports}`
  );
  codeToChange = codeToChange.replace(
    "imports: [",
    `imports: [
      ${imports.importsInNgModule}`
  );

  fs.writeFileSync(`${codeToChangePath}`, codeToChange, {
    encoding: "utf8",
    flag: "w",
  });
}

const materialImportsToShared = (project) => {
  const imports = {
    imports: `
    import { MaterialModule } from './material.module';
    `,
    importsInNgModule: `
    MaterialModule,
    `
  }

  const codeToChangePath = path.join(
    __dirname, "..", "..", "..", "..", "..", "..", "apps", project.folder, "src", "app", "modules", "shared", "shared.module.ts"
  );

  let codeToChange = fs.readFileSync(`${codeToChangePath}`, "utf8");

  codeToChange = codeToChange.replace(
    "import { NgModule } from '@angular/core';",
    `import { NgModule } from '@angular/core';
    ${imports.imports}`
  );
  codeToChange = codeToChange.replace(
    "imports: [",
    `imports: [
      ${imports.importsInNgModule}`
  );

  fs.writeFileSync(`${codeToChangePath}`, codeToChange, {
    encoding: "utf8",
    flag: "w",
  });
}

module.exports = {
  materialImports
};
