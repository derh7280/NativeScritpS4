import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { Application, Color, GestureEventData, GridLayout, View } from "@nativescript/core";
import { NoticiasService } from "../domain/noticias.service";
import * as dialogs from "@nativescript/core/ui/dialogs"// tns-core-modules/ui/dialogs";
import * as Toast from "nativescript-toasts";
import { RouterExtensions } from "@nativescript/angular";

@Component({
    selector: "Featured",
    templateUrl: "./featured.component.html"
})
export class FeaturedComponent implements OnInit {
    @ViewChild("layout") layout: ElementRef;
    resultados: Array<string>;
    noticiero: { Titulo: string }[]; 
    constructor(private noticias: NoticiasService, private routerExtensions: RouterExtensions) {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        // Init your component properties here.
        this.onLoadFavorito()
    }

    onLongPress(args: GestureEventData){
        console.log("Object that triggered the event: " + args.object);
        console.log("View that triggered the event: " +args.view);
        console.log("Nombre del evento " + args.eventName);

        const grid =<GridLayout>args.object;
        grid.rotate=0;
        grid.animate({ 
            rotate:360,
            duration:2000
        });
    }

    goBack(){
        this.routerExtensions.backToPreviousPage();
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
    
    insert(){

    }

    onLoadFavorito(){
        this.noticias.favs().then(( r: any) => {
            console.log("Resultados favoritos: " + JSON.stringify(r));
            this.resultados=r;
        }, (e) => {
            console.log("Error buscarAhora: " + e );
            Toast.show({text:"Error al listar los favoritos", duration: Toast.DURATION.SHORT});
        });
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>Application.getRootView();
        sideDrawer.showDrawer();
    }
}
