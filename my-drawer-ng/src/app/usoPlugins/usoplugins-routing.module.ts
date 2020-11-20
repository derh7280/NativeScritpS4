import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "@nativescript/angular";

import { UsopluginsComponent } from "./usoplugins.component";

const routes: Routes = [
    { path: "", component: UsopluginsComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class UsopluginsRoutingModule { }   