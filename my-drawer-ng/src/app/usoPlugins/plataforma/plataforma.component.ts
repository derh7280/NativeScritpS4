import { Component, NgModule, NO_ERRORS_SCHEMA, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { Application, Color, colorProperty, TextField, View, ImageSource } from "@nativescript/core";
import { ListadoPlugins } from "../listadoPlugins";
import { RouterExtensions } from "@nativescript/angular";
import { SearchBar } from "@nativescript/core/ui/search-bar";

@Component({
    selector: "Plataforma",
    templateUrl: "./plataforma.component.html",
    providers: [
        ListadoPlugins
],
})

export class PlataformaComponent implements OnInit {
   datosDispositivo: { propiedad: string, valor: string } [];
   searchPhrase: string;
    constructor(public plugins: ListadoPlugins,private routerExtensions: RouterExtensions ) {
    }

    ngOnInit(): void {
        this.datosDispositivo = this.plugins.onDatosPlataforma();
    }

    onSubmit(args) {
        const searchBar = args.object as SearchBar;
        console.log(`Searching for ${searchBar.text}`);
    }

    onTextChanged(args) {
        const searchBar = args.object as SearchBar;
        console.log(`Input changed! New value: ${searchBar.text}`);
    }

    onClear(args) {
        const searchBar = args.object as SearchBar;
        console.log(`Clear event raised`);
    }

    onDrawerButtonTap(): void {  
        const sideDrawer = <RadSideDrawer>Application.getRootView();
        sideDrawer.showDrawer();
    }
}