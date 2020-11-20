import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { Application } from "@nativescript/core";
import { AgentesService } from "../domain/agentes.service";
import * as appSettings from "@nativescript/core/application-settings";
import * as email from "nativescript-email";

@Component({
    selector: "Support",
    // moduleId:  module.id,//agregado
    templateUrl: "./support.component.html",
    providers: [AgentesService]
})
export class SupportComponent implements OnInit {
    textFieldValue: string = "";
    constructor(public agentes: AgentesService) {
        // Use the component constructor to inject providers.

    }

    ngOnInit(): void {
        // Init your component properties here.
        this.agentes.agregar("Contactando agente ... ");
        this.textFieldValue=appSettings.getString("nombreUsuario");
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>Application.getRootView();
        sideDrawer.showDrawer();
    }

    onSendMail(s){
        email.available().then((avail: boolean) => {
            console.log("Email available? " + avail);

        })
        this.envio(s);
    } 
 
    envio(s){ 
        const fs = require("file-system"); // usas el filesystem para adjuntar un archivo
        const appFolder = fs.knownFolders.currentApp(); // esto te da un objeto de tipo Folder
        const appPath = appFolder.path; // esto te da el path a la carpeta src
        const logoPath = appPath + "/res/img/logo.png"; //"/app/res/img/logo.png" aquí armas el path del archivo copiado
        console.log("Ruta App: " + appPath);
        email.compose({
            subject: "Mail de Prueba", // asunto del mail
            body: "Hola <strong>"+s+"</strong><p>Esto es una prueba de correo enviada desde la app...Ruta:<br>" +appPath+"</p>", // cuerpo que será enviado
            to: ["derh7280@hotmail.com"], //lista de destinatarios principales
            cc: [], //lista de destinatarios en copia
            bcc: [], //lista de destinatarios en copia oculta
            attachments: [ //listado de archivos adjuntos
            {
                fileName: "arrow1.png", // este archivo adjunto está en formato base 64 representado por un string
                path:"base64://iVBORw0KGgoAAAANSUhEUgAAABYAAAAoCAYAAAD6xArmAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAHGlET1QAAAACAAAAAAAAABQAAAAoAAAAFAAAABQAAAB5EsHiAAAAAEVJREFUSA1iYKAimDhxYjwIU9FIBgaQgZMmTfoPwlOmTJGniuHIhlLNxaOGwiNqNEypkwlGk9RokoIUfaM5ijo5Clh9AAAAAP//ksWFvgAAAEFJREFUY5g4cWL8pEmT/oMwiM1ATTBqONbQHA2W0WDBGgJYBUdTy2iwYA0BrILDI7VMmTJFHqv3yBUEBQsIg/QDAJNpcv6v+k1ZAAAAAElFTkSuQmCC",
                mimeType: "image/png" 
            }//,
            // {
            //     fileName: "icon.png", // este archivo es el que lees directo del filesystem del mobile
            //     path: logoPath,
            //     mimeType: "image/png"
            // }
            ]
        }).then(() => console.log("Enviador de mail cerrado"), (err) => console.log("Error: " + err)); 
    }
}
