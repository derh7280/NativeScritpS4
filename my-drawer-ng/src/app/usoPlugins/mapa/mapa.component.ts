import { Component, ElementRef, NgModule, NO_ERRORS_SCHEMA, OnInit, ViewChild } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { Application } from "@nativescript/core";
import { RouterExtensions } from "@nativescript/angular";
import { SearchBar } from "@nativescript/core/ui/search-bar";
import { ListadoPlugins } from "../listadoPlugins";
// import { registerElement } from "@nativescript/angular/element-registry";
import { registerElement } from "@nativescript/angular";//para usar mapa
import * as gmaps from "nativescript-google-maps-sdk";

registerElement("MapView", () => require("nativescript-google-maps-sdk").MapView); 
// const gmaps=require("nativescript-google-maps-sdk");

@Component({
    selector: "Mapa",
    templateUrl: "./mapa.component.html",
    providers: [
        ListadoPlugins
    ]
})

export class MapaComponent implements OnInit {
   @ViewChild("MapView") mapView:ElementRef

   datosDispositivo: { propiedad: string, valor: string } [];
   searchPhrase: string;

    constructor(public plugins: ListadoPlugins, private routerExtensions: RouterExtensions ) {
    
    }

    ngOnInit(): void {
       
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
    // onMapReady(event): void{
    //     console.log("Map Ready");
    // }
    onMapReady(args) {
        var mapView = args.object;
        var marker= new gmaps.Marker();
        marker.position = gmaps.Position.positionFromLatLng(6.2437966, -75.5746586);
        marker.title="Medellin";
        marker.snippet ="Alcaldia de medellin";
        marker.userData = { index:1};
        mapView.addMarker(marker);
    } 
}