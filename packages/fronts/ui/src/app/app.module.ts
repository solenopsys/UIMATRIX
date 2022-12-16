import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule, Routes } from "@angular/router";
import { FormsModule } from "@angular/forms";
import {BootstrapComponent, FuiTemplatesModule, GridState} from "@solenopsys/uimatrix-templates";
import { createNgxs } from "@solenopsys/lib-storage";
import {FuiGridModule, RowsState} from "@solenopsys/uimatrix-lists";
import { CommonModule } from "@angular/common";
import { FuiEditorModule, TextPageComponent } from "@solenopsys/uimatrix-editor-content";
import { HttpClientModule } from '@angular/common/http';


import {
  ExhibitFreeSelectComponent,
  ExhibitFreeSelectSaveComponent,
  ExhibitIconButtonComponent,
  ExhibitInfinityTableComponent,
  ExhibitModalComponent,
  ExhibitPathTreeComponent,
  ExhibitSelectEntityComponent,
  ExhibitSubMenuComponent,
  ExhibitTopPanelComponent,
  ExhibitTreeComponent
} from "./comps";
import { FuiComponentsModule } from "@solenopsys/uimatrix-controls";
import { FuiNavigateModule } from "@solenopsys/uimatrix-layouts";
import { FuiFormsModule } from "@solenopsys/uimatrix-forms";
import { FuiModalsModule } from "@solenopsys/uimatrix-modals";
import { ExhibitionListComponent } from "./exhibition-list/exhibition-list.component";
import { ExhibitComponent } from "./exhibit/exhibit.component";
import { environment } from "../environments/environment";
import { BlockChainComponent } from "./block-chain/block-chain.component";
import {FuiIconsModule} from "@solenopsys/uimatrix-icons";
import {ClusterState} from "@solenopsys/lib-clusters";

const routes: Routes = [
  { path: "", redirectTo: "docs", pathMatch: "full" },
  { path: "docs", component: TextPageComponent, data: { uid: "0x3d223" } },
  { path: "blockchain", component: BlockChainComponent },
  {
    path: "exhibition", component: ExhibitionListComponent,
    children: [{
      path: "**", component: ExhibitComponent
    }]
  }
];


export const PROVIDERS_CONF = [
  { provide: "assets_dir", useValue: "/fm/modules/alexstorm/exhibition" },
  { provide: "mod_name", useValue: "exhibition" },
  { provide: 'single_start', useValue: true },
];

export const IMPORTS_CONF = [
  RouterModule.forRoot([]),

  HttpClientModule,
  BrowserModule,
  FuiGridModule,
  FuiComponentsModule,
  FuiNavigateModule,
  FuiFormsModule,
  FuiIconsModule,
  FuiModalsModule,
  FormsModule,
  FuiTemplatesModule,
  RouterModule.forChild(routes),
  FuiGridModule,

  ...createNgxs(!environment.production, [ClusterState, GridState, RowsState, ], true),

  CommonModule,
  FuiEditorModule,
  ...createNgxs(!environment.production)
];

@NgModule({
  imports: [...IMPORTS_CONF],
  providers: [...PROVIDERS_CONF],
  declarations: [
    ExhibitSubMenuComponent,
    ExhibitSelectEntityComponent,
    ExhibitTopPanelComponent,
    ExhibitTreeComponent,
    ExhibitFreeSelectSaveComponent,
    ExhibitFreeSelectComponent,
    ExhibitModalComponent,
    ExhibitIconButtonComponent,
    ExhibitPathTreeComponent,
    ExhibitInfinityTableComponent,
    ExhibitionListComponent,
    ExhibitComponent,
    BlockChainComponent
  ],
  bootstrap: [BootstrapComponent]
})
export class AppModule {
}
