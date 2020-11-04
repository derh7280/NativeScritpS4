import { Component, OnInit, PLATFORM_INITIALIZER } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { Application, ItemEventData } from "@nativescript/core";
// import { ItemEventData } from "@nativescript/core/ui/list-view";
import { RouterExtensions } from "@nativescript/angular";

@Component({
    selector: "Listado",
    templateUrl: "./listado.component.html"
    // styleUrls: ['./listado.component.css']
})

export class ListadoComponent implements OnInit {

    
    productos: { name: string, imageSrc: string }[] = [
        { name: "Producto 1", imageSrc: "res://icon" },
        { name: "Producto 2", imageSrc: "res://icon" },
        { name: "Producto 3", imageSrc: "res://icon" },
        { name: "Producto 4", imageSrc: "res://icon" },
        { name: "Producto 5", imageSrc: "res://icon" },
        { name: "Producto 6", imageSrc: "res://icon" },
        { name: "Producto 7", imageSrc: "res://icon" },
        { name: "Producto 8", imageSrc: "res://icon" },
        { name: "Producto 9", imageSrc: "res://icon" },
        { name: "Producto 10", imageSrc: "res://icon" },
    ];
 
    constructor(private routerExtensions: RouterExtensions) {
    }

    onItemTap(args: ItemEventData): void {
        console.log('Item con index: ' + args.index);
        this.routerExtensions.navigate(['/vista'],{ 
            transition: {
                name: "fade"
            }
        });
        const sideDrawer = <RadSideDrawer>Application.getRootView();
        sideDrawer.closeDrawer();
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

   ngOnInit(){

   } 

   onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>Application.getRootView();
    sideDrawer.showDrawer();
}
   
}