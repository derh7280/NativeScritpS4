import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { Application } from "@nativescript/core";
import { Router } from "@angular/router";
import { RouterExtensions } from "@nativescript/angular";
import * as appSettings from "@nativescript/core/application-settings";

@Component({
    selector: "Formedicion",
    templateUrl: "./Formedicion.component.html"
})
export class FormedicionComponent implements OnInit {

    constructor(private routerExtensions: RouterExtensions) {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        // Init your component properties here.
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

    toSaveRedirect(url){
        appSettings.setString("nombreUsuario", "Messi");
        this.onNavItemTap(url)
    }
}
