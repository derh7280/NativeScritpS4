import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "@nativescript/angular";
import { NoticiasService } from "../domain/noticias.service";

import { SupportRoutingModule } from "./support-routing.module";
import { SupportComponent } from "./support.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        SupportRoutingModule
    ],
    declarations: [
        SupportComponent
    ],
    // providers: [NoticiasService],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class SupportModule { }
