import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule, NativeScriptFormsModule } from "@nativescript/angular"

import { MapaRoutingModule } from "./mapa-routing.module";
import { MapaComponent } from "./mapa.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        MapaRoutingModule,
        NativeScriptFormsModule
    ],
    declarations: [
        MapaComponent
    ], 
    // providers: [NoticiasService],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class MapaModule { }
 