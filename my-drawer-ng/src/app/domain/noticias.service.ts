import { Injectable } from "@angular/core";
import { getJSON, request } from "@nativescript/core/http";//"tns-core-modules/http";

@Injectable()
export class NoticiasService    {
    api: string ="https://d1b8b282c72e.ngrok.io";

    agregar(s: string)  {
        return request({
            url: this.api + "/favs",
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            content: JSON.stringify({
                nuevo:s
            })
        });
    }

    favs(){
        return getJSON(this.api + "/favs");
    }

    buscar(s: string)    {
        return getJSON(this.api + "/get?q=" +s);
    } 
}