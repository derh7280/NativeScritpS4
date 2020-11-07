import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule, NativeScriptFormsModule } from "@nativescript/angular";
// import { MinLenDirective } from "../directivas/minLen.validator";

import { EditionFormComponent } from "./edicion-form.component";
import { FormedicionRoutingModule } from "./formedicion-routing.module";
import { FormedicionComponent } from "./formedicion.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        FormedicionRoutingModule,
        NativeScriptFormsModule
    ],
    declarations: [ 
        EditionFormComponent,
        FormedicionComponent
        // MinLenDirective
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class FormedicionModule { }
 