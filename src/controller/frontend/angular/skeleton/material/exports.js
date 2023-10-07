const fs = require('fs');
const path = require('path');
const chp = require('child_process');

const materialExports = (project) => {
  materialExportsToMaterialModule(project);
}

const materialExportsToMaterialModule = (project) => {
  const exports = {
    exports: `
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
    ScrollingModule,
    `
  };

  const codeToChangePath = path.join(
    __dirname, "..", "..", "..", "..", "..", "..", "apps", project.folder, "src", "app", "modules", "shared", "material.module.ts"
  );

  let codeToChange = fs.readFileSync(`${codeToChangePath}`, "utf8");
  
  codeToChange = codeToChange.replace(
    "imports: [",
    `exports: [
      ${exports.exports}
    ],
    imports: [`
  );

  fs.writeFileSync(`${codeToChangePath}`, codeToChange, {
    encoding: "utf8",
    flag: "w",
  });
}

module.exports = {
  materialExports
};