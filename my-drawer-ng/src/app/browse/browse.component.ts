import { ItemEventData } from "@nativescript/core/ui/list-view"
import { Component, OnInit, PLATFORM_INITIALIZER } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { Application } from "@nativescript/core";
import { Person } from "../domain/personas.service";
import { RouterExtensions } from "@nativescript/angular";

@Component({
    selector: "Browse",
    templateUrl: "./browse.component.html",
    styleUrls: ['./browse.component.css']
})
export class BrowseComponent implements OnInit {

    countries: { name: string, imageSrc: string }[] = [
        { name: "Australia", imageSrc: "res://logo" },
        { name: "Belgium", imageSrc: "res://logo" },
        { name: "Bulgaria", imageSrc: "res://logo" },
        { name: "Canada", imageSrc: "res://logo" },
        { name: "Switzerland", imageSrc: "res://logo" },
        { name: "China", imageSrc: "res://logo" },
        { name: "Czech Republic", imageSrc: "res://logo" },
        { name: "Germany", imageSrc: "res://logo" },
        { name: "Spain", imageSrc: "res://logo" },
        { name: "Ethiopia", imageSrc: "res://logo" },
        { name: "Croatia", imageSrc: "res://logo" },
        { name: "Hungary", imageSrc: "res://logo" },
        { name: "Italy", imageSrc: "res://logo" },
        { name: "Jamaica", imageSrc: "res://logo" },
        { name: "Romania", imageSrc: "res://logo" },
        { name: "Russia", imageSrc: "res://logo" },
        { name: "United States", imageSrc: "res://logo" }
    ];

    private _person: Person;
    public lineav: string;
    public resultados: Array<string> = [];

    constructor(private routerExtensions: RouterExtensions, ) {
        this.lineav="Linea mostrada en Android ";
    }

    onPull(e) {
        console.log(e);
        const pullRefresh = e.object;
        setTimeout(() => {
            this.resultados.push("xxxxxxx");
            this.countries.push({name:"xxxx", imageSrc:"res://icon" })
            pullRefresh.refreshing = false;
        }, 1000);
       }

    onItemTap(args: ItemEventData): void {
        console.log('Item con index: ' + args.index);
    }

    ngOnInit() {
        this._person = new Person("Alex Noa", 30, 3205200 , "example@company.com", "Medellin", "Calle ", 11);
    }

    get person(): Person {
        return this._person;
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

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>Application.getRootView();
        sideDrawer.showDrawer();
    }
}
