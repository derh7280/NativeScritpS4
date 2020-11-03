import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "@nativescript/angular";

import { ListadoRoutingModule } from "./listado-routing.module";
import { ListadoComponent } from "./listado.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        ListadoRoutingModule
    ],
    declarations: [
        ListadoComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class ListadoModule { }
