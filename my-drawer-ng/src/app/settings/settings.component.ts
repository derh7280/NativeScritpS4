import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
// import { ItemEventData } from "@nativescript/core/ui/list-view"
import { Application, ItemEventData } from "@nativescript/core";
import * as dialogs from "@nativescript/core/ui/dialogs"// tns-core-modules/ui/dialogs";
import * as Toast from "nativescript-toasts";
import { RouterExtensions } from "@nativescript/angular";

import * as appSettings from "@nativescript/core/application-settings"; 

@Component({
    selector: "Settings",
    templateUrl: "./settings.component.html"
})
export class SettingsComponent implements OnInit {
    OpcionesConfig: { name: string, imageSrc: string }[] = [
        { name: "Configuración 1", imageSrc: "res://icon" },
        { name: "Configuración 2", imageSrc: "res://icon" },
        { name: "Configuración 3", imageSrc: "res://icon" },
        { name: "Configuración 4", imageSrc: "res://icon" },
    ];
    public usuario: string;
    constructor(private routerExtensions: RouterExtensions) {
        // Use the component constructor to inject providers.
        //appSettings.setString("nombreUsuario", ""); 
        this.usuario = appSettings.getString("nombreUsuario"); 
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

    doLater(fn){
        setTimeout(fn, 1000);
    }

    doLoad(){
        this.doLater(() => 
        dialogs.action("Mensaje", "Cancelar", ["Opcion1", "Opcion2"])
            .then((result) => 
            {
                    console.log("Resultado: " + result);
                        if(result==="Opcion1")
                        {
                            this.doLater(()=>
                                    dialogs.alert({
                                        title:"Titulo 1",
                                        message:"Msn 1",
                                        okButtonText:"Btn 1"
                                    }).then(() => console.log("Cerrado 1")
                                )
                            );  
                        }
                        else if (result==="Opcion2")
                        {
                            this.doLater(()=>
                                    dialogs.alert({
                                        title:"Titulo 2",
                                        message:"Msn 2",
                                        okButtonText:"Btn 2"
                                    }).then(() => console.log("Cerrado 2")
                                )
                            );      
                        }
            })
    );
   //npm install nativescript-toasts --save    
    const toastOptions: Toast.ToastOptions = { text: "Hello word", duration: Toast.DURATION.SHORT}   
    this.doLater(()=> Toast.show(toastOptions));       
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
            console.log(msn);
        });
    }

    displayLogin(){
        let options: dialogs.LoginOptions = {
            title: "Login Form",
            message: "Enter your credentials",
            okButtonText: "Login",
            cancelButtonText: "Cancel",
            neutralButtonText: "Neutral",
            userNameHint: "Enter your username",
            passwordHint: "Enter your password",
            userName: "john_doe",
            password: "123456"
        };
        
        dialogs.login(options).then((loginResult: dialogs.LoginResult) => {
            console.log(loginResult.result);
        });
    }

    displayCategoria(title: string, msn: string, opciones: Array<string>, touchs: boolean)
    {
        let options = {
            title: title,
            message: msn,
            cancelButtonText: "Cancelar",
            actions: opciones//["1", "2", "3", "4", "5"]
        };
        
        dialogs.action(options).then((result) => {
            console.log("Se selecciono la opción: "+result);
            if(touchs===true){
                const toastOptions: Toast.ToastOptions = { text: "Se selecciono la opción: " + result, duration: Toast.DURATION.SHORT}   
                this.doLater(()=> Toast.show(toastOptions)); 
            } 
        });
    }

    doName()
    {
        let options: dialogs.PromptOptions = {
            title: "Hey There",
            defaultText: " Enter your mood ",
            message: "How you doin'",
            okButtonText: "OK",
            cancelButtonText: "Cancel",
            neutralButtonText: "Neutral",
            cancelable: true,
            inputType: dialogs.inputType.text, // email, number, text, password, or email
            capitalizationType: dialogs.capitalizationType.sentences // all. none, sentences or words
        };
        
        dialogs.prompt(options).then((result: dialogs.PromptResult) => {
            console.log("El nombre ingresado fue: " + result.text);
        });
    }

    ngOnInit(): void {
        // Init your component properties here.
        //this.doLoad();
    }

    onItemTap(args: ItemEventData): void {
        console.log('Item con index: ' + args.index);
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>Application.getRootView();
        sideDrawer.showDrawer();
    }

    
}