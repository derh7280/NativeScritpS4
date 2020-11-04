import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { Application } from "@nativescript/core";
import { AgentesService } from "../domain/agentes.service";

@Component({
    selector: "Support",
    // moduleId:  module.id,//agregado
    templateUrl: "./support.component.html",
    providers: [AgentesService]
})
export class SupportComponent implements OnInit {

    constructor(public agentes: AgentesService) {
        // Use the component constructor to inject providers.

    }

    ngOnInit(): void {
        // Init your component properties here.
        this.agentes.agregar("Contactando agente ... ");
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>Application.getRootView();
        sideDrawer.showDrawer();
    }
}
