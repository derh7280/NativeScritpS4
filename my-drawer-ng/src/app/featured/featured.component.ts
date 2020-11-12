import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { Application, Color, GestureEventData, GridLayout, View } from "@nativescript/core";
import { NoticiasService } from "../domain/noticias.service";
import * as dialogs from "@nativescript/core/ui/dialogs"// tns-core-modules/ui/dialogs";
import * as Toast from "nativescript-toasts";
import { RouterExtensions } from "@nativescript/angular";
import { Store } from "@ngrx/store";
import { AppState } from "../app.module";
import { Noticia, NuevaNoticiaAction } from "../domain/noticias-state.model";

@Component({
    selector: "Featured",
    templateUrl: "./featured.component.html"
})
export class FeaturedComponent implements OnInit {
    @ViewChild("layout") layout: ElementRef;
    resultados: Array<string>;
    noticiero: { Titulo: string }[]; 
    constructor( private routerExtensions: RouterExtensions, private noticias: NoticiasService, private store: Store<AppState>) {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        // Init your component properties here.
        this.onLoadFavorito()
        //const array1 = ['a', 'b', 'c'];
        // array1.forEach(element => console.dir(element));
        this.store.select((state) => state.noticias.sugerida)
        .subscribe((data) =>{
            const f = data;
            if (f != null){
                Toast.show({text:"Sugerimos leer: " + f.titulo, duration: Toast.DURATION.SHORT});
            }
        }
        );
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
    // onItemFavorito(evento, noti): void{
    //     console.dir("Operacion agregar a favorito: " + noti);
    //     this.insertarFavorito(noti);
    // } 

    ToReadNow(evento, x): void{
        console.dir("Operacion leer ahora: " + x);
        this.store.dispatch(new NuevaNoticiaAction(new Noticia(x)));
    }

    // const inventario = [
    //     {nombre: 'manzanas', cantidad: 2},
    //     {nombre: 'bananas', cantidad: 0},
    //     {nombre: 'cerezas', cantidad: 5}
    // ];
    
    // verificarFavorito(favorito) { 

    //     return  favorito.nombre === 'manzanas';
    // }
    
    // console.log(inventario.find(verificarFavorito));

    goBack(){
        this.routerExtensions.backToPreviousPage();
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
    
    insert(){

    }

    onLoadFavorito(){
        this.noticias.favs().then(( r: any) => {
            console.log("Resultados favoritos: " + JSON.stringify(r));
            this.resultados=r;
        }, (e) => {
            console.log("Error buscarAhora: " + e );
            Toast.show({text:"Error al listar los favoritos", duration: Toast.DURATION.SHORT});
        });
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>Application.getRootView();
        sideDrawer.showDrawer();
    }
}
