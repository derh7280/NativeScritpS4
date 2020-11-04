import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "@nativescript/angular";

import { VistaRoutingModule } from "./vista-routing.module";
import { VistaComponent } from "./vista.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        VistaRoutingModule
    ],
    declarations: [
        VistaComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class VistaModule { }