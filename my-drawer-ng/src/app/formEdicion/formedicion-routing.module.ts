import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "@nativescript/angular";

import { FormedicionComponent } from "./formedicion.component";

const routes: Routes = [
    { path: "", component: FormedicionComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class FormedicionRoutingModule { }
