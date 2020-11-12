import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { Application } from "@nativescript/core";
import { Store } from "@ngrx/store";
import { AppState } from "../app.module";
import { NoticiasService } from "../domain/noticias.service";
import * as dialogs from "@nativescript/core/ui/dialogs"// tns-core-modules/ui/dialogs";
import * as Toast from "nativescript-toasts";

@Component({
    selector: "Home",
    templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {
    resultados: Array<string>;
    constructor(private noticias: NoticiasService, private store: Store<AppState>) {
        // Use the component constructor to inject providers. 
    }

    ngOnInit(): void {
        this.onLoadReadFavorito()
        this.store.select((state) => state.noticias.sugerida)
        .subscribe((data) =>{
            const f = data;
            if (f != null){
                Toast.show({text:"Libro seleccionado para leer: " + f.titulo, duration: Toast.DURATION.LONG});
            }
        }
        ); 
    }

    onLoadReadFavorito(){
        this.noticias.favs().then(( r: any) => {
            console.log("Resultados libros favoritos a leer: " + JSON.stringify(r));
            this.resultados=r;
        }, (e) => {
            console.log("Error buscarAhora: " + e );
            Toast.show({text:"Error al listar los favoritos", duration: Toast.DURATION.SHORT});
        });
    }

    deleteFavorito(evento, s){
        console.log("Eliminar " +s)
        // this.noticias.deletefav(s).then(( r: any) => {
        //     console.log("Resultados libros favoritos a eliminar: " + JSON.stringify(r));
        //     this.resultados=r;
        // }, (e) => {
        //     console.log("Error buscarAhora: " + e );
        //     Toast.show({text:"Error al listar los favoritos", duration: Toast.DURATION.SHORT});
        // });
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>Application.getRootView();
        sideDrawer.showDrawer();
    }
}
