import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { Application, Color, colorProperty, TextField, View } from "@nativescript/core";
import { NoticiasService } from "../domain/noticias.service";
import { ItemEventData } from "@nativescript/core/ui/list-view"
import {AnimationCurve} from "@nativescript/core/ui/enums";

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
    
    constructor(public noticias: NoticiasService) {
        // Use the component constructor to inject providers.

    }

    onItemTap(x): void {
        console.dir('Item con index: ' + x);
    }

    ngOnInit(): void {
        this.noticias.agregar("Hotel 1");
        this.noticias.agregar("Hotel 2");
        this.noticias.agregar("Hotel 3");
        // view.animate({
        //     translate: { x: 0, y: 100},
        //     duration: 1000,
        //     curve: AnimationCurve.easeIn
        // });
    }

    buscarAhora(s: string){
        this.resultados  = this.noticias.buscar().filter((x) => x.indexOf(s)>=0); 
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
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>Application.getRootView();
        sideDrawer.showDrawer();
    }

}
 