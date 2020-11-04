import { Component, Input, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { Application } from "@nativescript/core";

@Component({
    selector: "Vista",
    templateUrl: "./vista.component.html"
})
export class VistaComponent implements OnInit {
    // @Input() nombreProducto: string;
    constructor() {
        //this.nombre = 'DesarrolloWeb.com';
        
    }

    ngOnInit() {
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>Application.getRootView();
        sideDrawer.showDrawer();
    }
}
