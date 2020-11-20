import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "@nativescript/angular";

import { UsopluginsRoutingModule } from "./usoplugins-routing.module";
import { UsopluginsComponent } from "./usoplugins.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        UsopluginsRoutingModule
    ],
    declarations: [
        UsopluginsComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class UsopluginsModule { }
