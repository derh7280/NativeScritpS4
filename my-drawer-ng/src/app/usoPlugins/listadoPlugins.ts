import { Component, ElementRef, EventEmitter, Injectable, OnInit, Output, ViewChild } from "@angular/core";
import { Store }from "@ngrx/store";
import * as dialogs from "@nativescript/core/ui/dialogs"// tns-core-modules/ui/dialogs";
import * as Toast from "nativescript-toasts";
import * as SocialShare from "nativescript-social-share";
import { Application, Color, colorProperty, TextField, View, ImageSource, ImageAsset } from "@nativescript/core";
import { RouterExtensions } from "@nativescript/angular";
import * as email from "nativescript-email";
// import * as camera from "nativescript-camera";
import { isAvailable, requestCameraPermissions, takePicture } from '@nativescript/camera';
import { Image } from "@nativescript/core/ui/image";
import * as imageSourceModule from "@nativescript/core/image-source";
import { Device, Screen } from "@nativescript/core/platform"; 
import {
    connectionType,
    getConnectionType,
    startMonitoring, 
    stopMonitoring
    } from "@nativescript/core/connectivity"; 
    
@Injectable()
export class ListadoPlugins{
    constructor(private routerExtensions: RouterExtensions){      
    }
 
    public goBack(){
        this.routerExtensions.backToPreviousPage();
    }

    displayAlertDialog(title: string, msn: string)
    {
        let options = 
        {
            title: title,
            message: msn,
            okButtonText: "OK"
        };
        
        dialogs.alert(options).then(() => 
        {
            console.log("displayAlertDialog: " +msn);
        });
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

    public onSendMail(s){
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
            body: "Hola <strong>"+s+"</strong><p>Esto es una prueba de correo enviada desde la app...<br></p>", // cuerpo que será enviado
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

    public goCamera(){
        // camera.requestPermissions().then
        requestCameraPermissions().then(
            function success() {
                const options = { 
                                    width: 300, 
                                    height: 300, 
                                    keepAspectRatio: false, 
                                    saveToGallery: true 
                                };
                //camera.takePicture(options).
                takePicture(options).
                    then((imageAsset) => {
                        console.log("Tamaño: " + imageAsset.options.width + "x" + imageAsset.options.height);
                        console.log("keepAspectRatio: " + imageAsset.options.keepAspectRatio);
                        console.log("Foto guardada");
                        console.log(imageAsset);
                        // SocialShare.shareImage(imageAsset, "Asunto: compartido desde la APP");
                    }).catch((err) => {
                        console.log("Error -> " + err.message);
                    });
            }, 
            function failure() {
                console.log("Permiso de la camara no aceptado por el usuario");
            }
        );
    }

    // public goCameraShare(){
    //     camera.takePicture(options).
    //         then ((imageAsset) => {
    //             console.log(options)
    //             ImageSource.fromAsset(imageAsset)
    //             .then((imageSource)=> {
    //                 SocialShare.shareImage(imageSource, "Asunto: compartido desde la APP");
    //             }).catch((err)=>{
    //                 console.log("Error -> " + err.message);
    //             })
    //         }).catch((err)=>{
    //             console.log("Error -> " + err.message);
    //         });
    // }
   
    onDatosPlataforma(): any {
        var resultados: Array<string> = [];
        resultados.push("Modelo: " + Device.model);
        resultados.push("Dispositivo: " + Device.deviceType);
        resultados.push("Sistema operativo: " + Device.os);
        resultados.push("VR SO: " + Device.osVersion);
        resultados.push("Versión SDK: " + Device.sdkVersion);
        resultados.push("Lenguaje: " + Device.language);
        resultados.push("Fabricante: " + Device.manufacturer);
        resultados.push("MAC: " + Device.uuid);
        resultados.push("Altura en pixeles normalizados: " + Screen.mainScreen.heightDIPs); // DIP (Device Independent Pixel), también conocido como densidad de píxeles independientes. Un píxel virtual que aparece aproximadamente del mismo tamaño en una variedad de densidades de pantalla.
        resultados.push("Altura pixels: " + Screen.mainScreen.heightPixels);
        resultados.push("Escala pantalla: " + Screen.mainScreen.scale);
        resultados.push("Ancho pixeles normalizados: " + Screen.mainScreen.widthDIPs);
        resultados.push("Ancho pixels: " + Screen.mainScreen.widthPixels);

        const dispositivo: { propiedad: string, valor: string } [] = 
        [
            { propiedad: "Modelo" , valor: ""+ Device.model },
            { propiedad: "Dispositivo" , valor: Device.deviceType }, 
            { propiedad: "Sistema operativo", valor: Device.os },
            { propiedad: "VR SO" , valor: Device.osVersion },
            { propiedad: "Versión SDK" , valor: Device.sdkVersion },
            { propiedad: "Lenguaje" , valor: Device.language },
            { propiedad: "Fabricante" , valor: Device.manufacturer },
            { propiedad: "MAC" , valor: Device.uuid},
            { propiedad: "Altura en pixeles normalizados", valor: ""+ Screen.mainScreen.heightDIPs },
            { propiedad: "Altura pixels", valor: ""+ Screen.mainScreen.heightPixels },
            { propiedad: "Escala pantalla", valor: ""+ Screen.mainScreen.scale },
            { propiedad: "Ancho pixeles normalizados" , valor:""+ Screen.mainScreen.widthDIPs },
            { propiedad: "Ancho pixels: " , valor:""+ Screen.mainScreen.widthPixels }
        ];
       
        // console.log(resultados);
        console.log("DATOS DEL DISPOSITIVO " + resultados);
        return dispositivo;
        //dispositivo.push({name:"xxxx", imageSrc:"res://icon" })
        }
        
        public monitoreo: Array<string> = [];
        monitoreando: boolean = false; // una variable para saber si estás monitoreando o no.
        onMonitoreoDatos(): Array<string> {
            const myConnectionType = getConnectionType();
            switch (myConnectionType) {
                case connectionType.none:
                    console.log("Sin Conexion");
                    this.monitoreo.push("Sin Conexion");
                    break;
                case connectionType.wifi:
                    console.log("WiFi");
                    this.monitoreo.push("WiFi");
                    break;
                case connectionType.mobile:
                    console.log("Mobile"); 
                    this.monitoreo.push("Mobile");
                    break;
                case connectionType.ethernet:
                    console.log("Ethernet"); // es decir, cableada
                    this.monitoreo.push("Ethernet");
                    break;
                case connectionType.bluetooth:
                    console.log("Bluetooth");
                    this.monitoreo.push("Bluetooth");
                    break;
                default:
                    this.monitoreo.push("");
                    break;
            }

            this.monitoreando = !this.monitoreando;
            if (this.monitoreando) 
            {
                startMonitoring((newConnectionType) => 
                {
                    switch (newConnectionType) 
                    {
                        case connectionType.none:
                            console.log("Cambió a sin conexión.");
                            this.monitoreo.push("Cambió a sin conexión.");
                            break;
                        case connectionType.wifi:
                            console.log("Cambió a WiFi.");
                            this.monitoreo.push("Cambió a WiFi.");
                            break;
                        case connectionType.mobile:
                            console.log("Cambió a mobile.");
                            this.monitoreo.push("Cambió a WiFi.");
                            break;
                        case connectionType.ethernet:
                            console.log("Cambió a ethernet.");
                            this.monitoreo.push("Cambió a WiFi.");
                            break;
                        case connectionType.bluetooth:
                            console.log("Cambió a bluetooth.");
                            this.monitoreo.push("Cambió a WiFi.");
                            break;
                        default:
                            this.monitoreo.push("Cambió a WiFi.");
                            break;
                    }
                });
            } 
            else 
            {
                stopMonitoring();
                this.monitoreo.push("Sin seguimiento");
            }
            return this.monitoreo;
        } 
}