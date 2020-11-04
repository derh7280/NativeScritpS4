import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "@nativescript/angular";

import { EventsRoutingModule } from "./events-routing.module";
import { EventsComponent } from "./events.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        EventsRoutingModule
    ],
    declarations: [
        EventsComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class EventsModule { }
