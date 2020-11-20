import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule, NativeScriptFormsModule } from "@nativescript/angular"

import { CompartirRoutingModule } from "./compartir-routing.module";
import { CompartirComponent } from "./compartir.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        CompartirRoutingModule,
        NativeScriptFormsModule
    ],
    declarations: [
        CompartirComponent
    ],
    // providers: [NoticiasService],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class CompartirModule { }
 