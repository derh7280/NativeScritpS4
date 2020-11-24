import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from "@angular/core";
import { Store }from "@ngrx/store";
import * as dialogs from "@nativescript/core/ui/dialogs"// tns-core-modules/ui/dialogs";
import * as Toast from "nativescript-toasts";
// import * as SocialShare from "nativescript-social-share";
import * as SocialShare from "@nativescript/social-share";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { Application, Color, colorProperty, TextField, View, ImageSource } from "@nativescript/core";
import { AppState } from "../app.module";
import { Noticia, NuevaNoticiaAction } from "../domain/noticias-state.model";
import { NoticiasService } from "../domain/noticias.service";
import { ItemEventData } from "@nativescript/core/ui/list-view";
import { AnimationCurve } from "@nativescript/core/ui/enums";

@Component({
    selector: "Search",
    //moduleId:  module.id,//agregado
    templateUrl: "./search.component.html",
    styleUrls: ['./search.component.css']
    // providers: [NoticiasService]
})

export class SearchComponent implements OnInit {
  
    @ViewChild("layout") layout: ElementRef;
    resultados: Array<string>;
    
    constructor(private noticias: NoticiasService, private store: Store<AppState>) {
        // Use the component constructor to inject providers.
    }

    onItemTap(x): void {
        console.dir('Item con index: ' + x);
        // this.store.dispatch(new NuevaNoticiaAction(new Noticia(x.view.bindingContext)));
    }

    onLongPress(s):void {
        console.log(s); 
        SocialShare.shareText(s, "Asunto: compartido desde el curso");
    } 

    public shareImagen():void{
        console.dir("Compartiendo Imagen");
        // let imagen = ImageSource.fromFile("~/res/img/logo.png");//~/path/to/myImage.jpg
        // //let image = ImageSource.fromUrl("https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png");
        // SocialShare.shareImage(imagen, "Imagen compartida");

        ImageSource.fromUrl("https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png").then((image) => {
            SocialShare.shareImage(image, "Imagen compartida");
        }); 
    } 

    public shareTexto(s):void{
        console.log(s); 
        SocialShare.shareText(s, "Asunto: Texto compartido desde el curso");
    } 


    ngOnInit(): void {
    //    this.store.select((state) => state.noticias.sugerida)
    //    .subscribe((data) =>{
    //        const f = data;
    //        if (f != null){
    //            Toast.show({text:"Libro seleccionado para leer: " + f.titulo, duration: Toast.DURATION.SHORT});
    //        }
    //    }
    //    );
    }

    onItemFavorito(evento, noti): void{
        console.dir("Operacion agregar a favorito: " + noti);
        this.insertarFavorito(noti);
    } 

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>Application.getRootView();
        sideDrawer.showDrawer();
    }

    buscarAhora(s: string){
        console.dir("buscarAhora " + s);
        this.noticias.buscar(s).then(( r: any) => {
            console.log("Resultados buscarAhora: " + JSON.stringify(r));
            this.resultados = r;
            const layout=<View>this.layout.nativeElement;
            layout.animate({
                backgroundColor: new Color("red"),
                duration:300,
                delay:150//espera de 150ms
            }).then(() => layout.animate({
                backgroundColor: new Color("white"),
                duration:300,
                delay:150
            }));
        }, (e) => {
            console.log("Error buscarAhora: " + e );
            Toast.show({text:"Error en la busqueda", duration: Toast.DURATION.SHORT});
        });
    }

    insertarFavorito(s: string){
        console.dir("Insertando a favoritos item: " + s);
        this.noticias.agregar(s).then(( r: any) => {
            console.log("Resultados insertarFavorito: " + JSON.stringify(r));
            Toast.show({text: s +" item agregado a favorito ", duration: Toast.DURATION.SHORT});
            // this.resultados = r;
        }, (e) => {
            console.log("insertarFavorito: " + e );
            Toast.show({text:"Error en insertar favorito", duration: Toast.DURATION.SHORT});
        });
    }
}