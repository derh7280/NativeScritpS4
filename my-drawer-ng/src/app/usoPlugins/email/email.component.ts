import { Component, NgModule, NO_ERRORS_SCHEMA, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { Application, Color, colorProperty, TextField, View, ImageSource } from "@nativescript/core";
import { ListadoPlugins } from "../listadoPlugins";
import { RouterExtensions } from "@nativescript/angular";
import * as appSettings from "@nativescript/core/application-settings";

@Component({
    selector: "Email",
    templateUrl: "./email.component.html",
    providers: [
        ListadoPlugins
],
})

export class EmailComponent implements OnInit {
    textFieldValue: string = "";
    constructor(public plugins: ListadoPlugins,private routerExtensions: RouterExtensions ) {
    }

    ngOnInit(): void {
        this.textFieldValue=appSettings.getString("nombreUsuario","Usuario");
    }

    onDrawerButtonTap(): void {  
        const sideDrawer = <RadSideDrawer>Application.getRootView();
        sideDrawer.showDrawer();
    }
}