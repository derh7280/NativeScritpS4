import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { Application, Color, colorProperty, TextField, View } from "@nativescript/core";
import { NoticiasService } from "../domain/noticias.service";
import { ItemEventData } from "@nativescript/core/ui/list-view"
import {AnimationCurve} from "@nativescript/core/ui/enums";
import * as dialogs from "@nativescript/core/ui/dialogs"// tns-core-modules/ui/dialogs";
import * as Toast from "nativescript-toasts";

@Component({
    selector: "Search",
    //moduleId:  module.id,//agregado
    templateUrl: "./search.component.html",
    styleUrls: ['./search.component.css']
    // providers: [NoticiasService]
})

export class SearchComponent implements OnInit {
  
    @ViewChild("layout") layout: ElementRef;
    resultados: Array<string>;
    
    constructor(private noticias: NoticiasService) {
        // Use the component constructor to inject providers.

    }

    onItemTap(x): void {
        console.dir('Item con index: ' + x);
    }

    ngOnInit(): void {
       
    }

    onItemFavorito(evento, noti): void{
        console.dir("Item agregado a favorito: " + noti);
        Toast.show({text: noti +" item agregado a favorito ", duration: Toast.DURATION.SHORT});
        this.insertarFavorito(noti);
    } 

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>Application.getRootView();
        sideDrawer.showDrawer();
    }

    buscarAhora(s: string){
        console.dir("buscarAhora " + s);
        this.noticias.buscar(s).then(( r: any) => {
            console.log("Resultados buscarAhora: " + JSON.stringify(r));
            this.resultados = r;
            const layout=<View>this.layout.nativeElement;
            layout.animate({
                backgroundColor: new Color("red"),
                duration:300,
                delay:150//espera de 150ms
            }).then(() => layout.animate({
                backgroundColor: new Color("white"),
                duration:300,
                delay:150
            }));
        }, (e) => {
            console.log("Error buscarAhora: " + e );
            Toast.show({text:"Error en la busqueda", duration: Toast.DURATION.SHORT});
        });
    }

    insertarFavorito(s: string){
        console.dir("Insertando a favoritos item: " + s);
        this.noticias.agregar(s).then(( r: any) => {
            console.log("Resultados insertarFavorito: " + JSON.stringify(r));
            // this.resultados = r;
        }, (e) => {
            console.log("insertarFavorito: " + e );
            Toast.show({text:"Error en insertar favorito", duration: Toast.DURATION.SHORT});
        });
    }
}