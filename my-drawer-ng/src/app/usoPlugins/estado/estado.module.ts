import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule, NativeScriptFormsModule } from "@nativescript/angular"

import { EstadoRoutingModule } from "./estado-routing.module";
import { EstadoComponent } from "./estado.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        EstadoRoutingModule,
        NativeScriptFormsModule
    ],
    declarations: [
        EstadoComponent
    ], 
    // providers: [NoticiasService],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class EstadoModule { }
 