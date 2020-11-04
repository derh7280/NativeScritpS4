import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { Application, GestureEventData, GridLayout } from "@nativescript/core";

@Component({
    selector: "Featured",
    templateUrl: "./featured.component.html"
})
export class FeaturedComponent implements OnInit {

    constructor() {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        // Init your component properties here.
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

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>Application.getRootView();
        sideDrawer.showDrawer();
    }
}
