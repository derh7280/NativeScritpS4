import { Component, ElementRef, NgModule, NO_ERRORS_SCHEMA, OnInit, ViewChild } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { Application, Color, colorProperty, TextField, View, ImageSource } from "@nativescript/core";
import { ListadoPlugins } from "../listadoPlugins";
import { RouterExtensions } from "@nativescript/angular";
import { SearchBar } from "@nativescript/core/ui/search-bar";
import { registerElement } from "@nativescript/angular/element-registry";//para usar mapa

registerElement("MapView", () => require("nativescript-google-maps-sdk").MapView); 

@Component({
    selector: "Mapa",
    templateUrl: "./mapa.component.html",
    providers: [
        ListadoPlugins
],
})

export class MapaComponent implements OnInit {
   @ViewChild("MapView") mapView:ElementRef

   datosDispositivo: { propiedad: string, valor: string } [];
   searchPhrase: string;
    constructor(public plugins: ListadoPlugins,private routerExtensions: RouterExtensions ) {
    
        var gmaps=require("nativescript-google-maps-sdk");
        function onMapReady(args) {
            var mapView = args.object;
            var marker= new gmaps.Marker();
            marker.position = gmaps.Position.positionFromLatLng(-34.6037, -57.3817);
            marker.title="Buenos Aires";
            marker.snippet ="Argentina";
            marker.userData = { index:1};
            mapView.addMarker(marker);
        }
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

    //map Events
    onMapReady(event): void{
        console.log("Map Ready");
    }
}