import { Component, NgModule, NO_ERRORS_SCHEMA, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { Application, Color, colorProperty, TextField, View, ImageSource } from "@nativescript/core";
import { ListadoPlugins } from "../listadoPlugins";
import { RouterExtensions } from "@nativescript/angular";
import * as dialogs from "@nativescript/core/ui/dialogs"// tns-core-modules/ui/dialogs";
import * as Toast from "nativescript-toasts";
import { isAvailable, requestCameraPermissions, takePicture } from '@nativescript/camera';

@Component({
    selector: "Camara",
    templateUrl: "./camara.component.html",
    providers: [
        ListadoPlugins
],
})

export class CamaraComponent implements OnInit {

    constructor(public plugins: ListadoPlugins,private routerExtensions: RouterExtensions ) {
    }

    ngOnInit(): void {
        //permisos de camara
        if (isAvailable()) {
            requestCameraPermissions()
              .then(
                fulfilled => {
                  console.log('Permisos de cámara establecidos.');
                },
                rejected => {
                  this.onMsn('No se establecieron permisos de cámara.');
                }
              )
          } else {
            this.onMsn('No se detectó cámara');
          }
    }

    onDrawerButtonTap(): void {  
        const sideDrawer = <RadSideDrawer>Application.getRootView();
        sideDrawer.showDrawer();
    }

    onMsn (msn)
    {
        dialogs.action(msn, "Cancelar", ["Opcion1", "Opcion2"])
        .then((result) => 
        {
                console.log("Resultado: " + result);
                    if(result==="Opcion1")
                    {
                                dialogs.alert({
                                    title:"Titulo 1",
                                    message:"Msn 1",
                                    okButtonText:"Btn 1"
                                }).then(() => console.log("Cerrado 1")
                            ) 
                    }
                    else if (result==="Opcion2")
                    {
                        dialogs.alert({
                                title:"Titulo 2",
                                message:"Msn 2",
                                okButtonText:"Btn 2"
                            }).then(() => console.log("Cerrado 2")
                        )
                    }
        })
    }
}