import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule, NativeScriptFormsModule } from "@nativescript/angular"

import { PlataformaRoutingModule } from "./plataforma-routing.module";
import { PlataformaComponent } from "./plataforma.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        PlataformaRoutingModule,
        NativeScriptFormsModule
    ],
    declarations: [
        PlataformaComponent
    ], 
    // providers: [NoticiasService],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class PlataformaModule { }
 