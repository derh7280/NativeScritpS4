import { Component, NgModule, NO_ERRORS_SCHEMA, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { Application, Color, colorProperty, TextField, View, ImageSource } from "@nativescript/core";
import { ListadoPlugins } from "../listadoPlugins";
import { RouterExtensions } from "@nativescript/angular";

@Component({
    selector: "Compartir",
    templateUrl: "./compartir.component.html",
    providers: [
        ListadoPlugins
],
})

export class CompartirComponent implements OnInit {

    constructor(public plugins: ListadoPlugins,private routerExtensions: RouterExtensions ) {
    }

    ngOnInit(): void {
        
    }


    onDrawerButtonTap(): void {  
        const sideDrawer = <RadSideDrawer>Application.getRootView();
        sideDrawer.showDrawer();
    }
}