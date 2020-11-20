import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule, NativeScriptFormsModule } from "@nativescript/angular"

import { EmailRoutingModule } from "./email-routing.module";
import { EmailComponent } from "./email.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        EmailRoutingModule,
        NativeScriptFormsModule
    ],
    declarations: [
        EmailComponent
    ],
    // providers: [NoticiasService],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class EmailModule { }
 