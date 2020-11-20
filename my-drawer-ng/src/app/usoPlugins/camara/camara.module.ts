import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule, NativeScriptFormsModule } from "@nativescript/angular"

import { CamaraRoutingModule } from "./camara-routing.module";
import { CamaraComponent } from "./camara.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        CamaraRoutingModule,
        NativeScriptFormsModule
    ],
    declarations: [
        CamaraComponent
    ],
    // providers: [NoticiasService],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class CamaraModule { }
 