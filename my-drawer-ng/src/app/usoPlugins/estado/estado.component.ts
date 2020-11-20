import { Component, NgModule, NO_ERRORS_SCHEMA, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { Application, Color, colorProperty, TextField, View, ImageSource } from "@nativescript/core";
import { ListadoPlugins } from "../listadoPlugins";
import { RouterExtensions } from "@nativescript/angular";

@Component({
    selector: "Estado",
    templateUrl: "./estado.component.html",
    providers: [
        ListadoPlugins
],
})

export class EstadoComponent implements OnInit {
    datosRed: Array<string> = [];
    // datosRed: { propiedad: string, valor: string } [];
    constructor(public plugins: ListadoPlugins,private routerExtensions: RouterExtensions ) {
    }

    ngOnInit(): void {
        // this.plugins.onMonitoreoDatos();
        this.datosRed = this.plugins.onMonitoreoDatos();
    }

    toRefresh(): void {
        // this.plugins.onMonitoreoDatos();
        this.datosRed = this.plugins.onMonitoreoDatos();
    }

    onDrawerButtonTap(): void {  
        const sideDrawer = <RadSideDrawer>Application.getRootView();
        sideDrawer.showDrawer();
    }
}