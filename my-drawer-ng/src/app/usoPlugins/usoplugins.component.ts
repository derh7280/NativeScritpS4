import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
// import { ItemEventData } from "@nativescript/core/ui/list-view"
import { Application, ItemEventData } from "@nativescript/core";
import * as dialogs from "@nativescript/core/ui/dialogs"// tns-core-modules/ui/dialogs";
import * as Toast from "nativescript-toasts";
import { RouterExtensions } from "@nativescript/angular";

@Component({
    selector: "Usoplugins",
    templateUrl: "./usoplugins.component.html",
})

export class UsopluginsComponent implements OnInit {
    OpcionesConfig: { plugins: string, destino: string, estilo: string }[] = [
        { plugins: "Compartir redes sociales", destino: "/compartir", estilo: "nt-button -primary" },
        { plugins: "Envio email", destino: "/email", estilo: "nt-button -outline -rounded-lg" },
        { plugins: "Camara", destino: "/camara", estilo: "nt-button -primary" },
        { plugins: "Datos plataforma", destino: "/plataforma", estilo: "nt-button -outline -rounded-lg" },
        { plugins: "Estado de red", destino: "/estadored", estilo: "nt-button -primary" },
        { plugins: "Uso de mapas", destino: "/mapas", estilo: "nt-button -outline -rounded-lg" }
    ];
   
    constructor(private routerExtensions: RouterExtensions) {
    }

    onNavItemTap(navItemRoute: string): void {
        console.log(navItemRoute);
        this.routerExtensions.navigate([navItemRoute], {
            transition: {
                name: "fade"
            }
        });
        const sideDrawer = <RadSideDrawer>Application.getRootView();
        sideDrawer.closeDrawer();
    }

    displayAlertDialog(title: string, msn: string)
    {
        let options = 
        {
            title: title,
            message: msn,
            okButtonText: "OK"
        };
        
        dialogs.alert(options).then(() => 
        {
            console.log(msn);
        });
    }

    ngOnInit(): void {
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>Application.getRootView();
        sideDrawer.showDrawer();
    }

}