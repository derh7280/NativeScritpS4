import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { Application } from "@nativescript/core";
import { Router } from "@angular/router";
import { RouterExtensions } from "@nativescript/angular";
import * as appSettings from "@nativescript/core/application-settings";

@Component({
    selector: "Formedicion",
    templateUrl: "./formedicion.component.html"
})
export class FormedicionComponent implements OnInit {

    txtUserValue: string = "";

    @Output() search: EventEmitter<string> = new EventEmitter();
    @Input() inicial: string;

    constructor(private routerExtensions: RouterExtensions) {
        // Use the component constructor to inject providers.
        this.inicial=appSettings.getString("nombreUsuario");
        this.txtUserValue=this.inicial;
    }

    ngOnInit(): void {
        this.inicial=appSettings.getString("nombreUsuario");
        this.txtUserValue=this.inicial;
    }
 
    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>Application.getRootView();
        sideDrawer.showDrawer();
    }

    onNavItemTap(navItemRoute: string): void {
        this.routerExtensions.navigate([navItemRoute], {
            transition: {
                name: "fade"
            }
        });
               
        const sideDrawer = <RadSideDrawer>Application.getRootView();
        sideDrawer.closeDrawer();
    }

    // buscarAhora(s: string){
    //     console.dir("buscarAhora " + s);
    //     this.noticias.buscar(s).then(( r: any) => {
    //         console.log("Resultados buscarAhora: " + JSON.stringify(r));
    //         this.resultados = r;
    //         const layout=<View>this.layout.nativeElement;
    //         layout.animate({
    //             backgroundColor: new Color("red"),
    //             duration:300,
    //             delay:150//espera de 150ms
    //         }).then(() => layout.animate({
    //             backgroundColor: new Color("white"),
    //             duration:300,
    //             delay:150
    //         }));
    //     }, (e) => {
    //         console.log("Error buscarAhora: " + e );
    //         Toast.show({text:"Error en la busqueda", duration: Toast.DURATION.SHORT});
    //     });
    // }    

    toSaveRedirect(s: string, url: string){
        console.log(s);
        // if(this.txtUserValue!="") 
        // {
            this.search.emit(this.txtUserValue);
            appSettings.setString("nombreUsuario", s);
            this.onNavItemTap(url);
        // }  
    }
}
