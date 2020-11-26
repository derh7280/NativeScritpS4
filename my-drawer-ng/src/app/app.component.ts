import { Component, OnInit } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { RouterExtensions } from "@nativescript/angular";
import { DrawerTransitionBase, RadSideDrawer, SlideInOnTopTransition } from "nativescript-ui-sidedrawer";
import { filter } from "rxjs/operators";
import { Application, ApplicationSettings } from "@nativescript/core";
import * as dialogs from "@nativescript/core/ui/dialogs";
import * as Toast from "nativescript-toasts";
import { firebase } from "@nativescript/firebase";
import { FirebaseHttpMetric } from "@nativescript/firebase/performance/performance";
// import { Message } from "nativescript-plugin-firebase";
//const firebase = require("nativescript-plugin-firebase");

@Component({
    selector: "ns-app",
    templateUrl: "app.component.html"
})
export class AppComponent implements OnInit {
    private _activatedUrl: string;
    private _sideDrawerTransition: DrawerTransitionBase;
    public UsuarioActivo:string; 
    constructor(private router: Router, private routerExtensions: RouterExtensions) {
        // Use the component constructor to inject services.
    }
 
    ngOnInit(): void {
        this.UsuarioActivo = ApplicationSettings.getString("nombreUsuario", "Anonimo"); 
        this._activatedUrl = "/home";
        this._sideDrawerTransition = new SlideInOnTopTransition();

        this.router.events
        .pipe(filter((event: any) => event instanceof NavigationEnd))
        .subscribe((event: NavigationEnd) => this._activatedUrl = event.urlAfterRedirects);

        firebase.init({
            // Optionally pass in properties for database, authentication and cloud messaging,
            // see their respective docs.
                onMessageReceivedCallback: (message: firebase.Message) => {
                console.log(`título: ${message.title}`);
                console.log(`cuerpo: ${message.body}`);
                console.log(`data: ${JSON.stringify(message.data)}`);
                Toast.show({ text: "Notificación: " + message.title, duration: Toast.DURATION.LONG });
            },
            onPushTokenReceivedCallback: (token) => console.log("Firebase push token: " + token) //podemos guardar los token por usuarios o dispositivos
        }).then(
            () => {
                console.log("firebase.init done");
            },
            error => {
            console.log(`firebase.init error: ${error}`);
            }
        );
    }

    get sideDrawerTransition(): DrawerTransitionBase {
        return this._sideDrawerTransition;
    }

    isComponentSelected(url: string): boolean {
        return this._activatedUrl === url;
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
}
