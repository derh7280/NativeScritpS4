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
        { name: "Australia", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/au.png" },
        { name: "Belgium", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/be.png" },
        { name: "Bulgaria", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/bg.png" },
        { name: "Canada", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/ca.png" },
        { name: "Switzerland", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/ch.png" },
        { name: "China", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/cn.png" },
        { name: "Czech Republic", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/cz.png" },
        { name: "Germany", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/de.png" },
        { name: "Spain", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/es.png" },
        { name: "Ethiopia", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/et.png" },
        { name: "Croatia", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/hr.png" },
        { name: "Hungary", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/hu.png" },
        { name: "Italy", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/it.png" },
        { name: "Jamaica", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/jm.png" },
        { name: "Romania", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/ro.png" },
        { name: "Russia", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/ru.png" },
        { name: "United States", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/us.png" },
    ];

    private _person: Person;
    public lineav: string;
    resultados: Array<string> = [];
    constructor(private routerExtensions: RouterExtensions, ) {
        this.lineav="Linea mostrada en Android ";
    }

    onPull(e) {
        console.log(e);
        const pullRefresh = e.object;
        setTimeout(() => {
            this.resultados.push("xxxxxxx");
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
