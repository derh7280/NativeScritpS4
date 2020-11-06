import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "@nativescript/angular";

import { FormedicionRoutingModule } from "./formedicion-routing.module";
import { FormedicionComponent } from "./formedicion.component";

// import { MinLenDirective } from "../directivas/minLen.validator"; 

@NgModule({
    imports: [
        NativeScriptCommonModule,
        FormedicionRoutingModule
    ],
    declarations: [ 
        FormedicionComponent
        // MinLenDirective
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class FormedicionModule { }
 