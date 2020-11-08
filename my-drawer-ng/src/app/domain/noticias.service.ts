import { Injectable } from "@angular/core";
import * as couchbaseModule from "nativescript-couchbase"; 
// import couchbaseModule = require("nativescript-couchbase"); 
import { getJSON, request } from "@nativescript/core/http";
const sqlite = require("nativescript-sqlite");

@Injectable()
export class NoticiasService    {
    api: string ="https://0230b734463a.ngrok.io";
    private database: any;//instancia SQLite abierta 
    public noticiero: Array<any>;//los resultados de las consulta.
    databaseDoc: couchbaseModule.Couchbase; 

    constructor(){
        // this.CreateDB("mi_db_logs");
        this.databaseDoc = new couchbaseModule.Couchbase("test-database"); 
        this.getDB((db) => {
            console.dir(db);
            db.each("SELECT * FROM logs",
                (err, fila) => console.log("fila: ", fila),
                (err, totales) => console.log("Filas totales: ", totales));
        }, () => console.log("error en getDB"));
        this.CreateTable("mi_db_logs","favoritos","id INTEGER PRIMARY KEY AUTOINCREMENT, texto TEXT");
        this.databaseDoc.createView("logs", "1", (document, emitter) =>
        emitter.emit(document._id, document));
        const rows = this.database.executeQuery("logs", {limit : 200});
        console.log("documentos: " + JSON.stringify(rows)); 
    }

    CreateDB(DBname) {
        if(sqlite.exists(DBname)){
                console.log("Usando la Database: " + DBname);
                this.database = sqlite(DBname);
                return true;
            }
        else{
                new sqlite(DBname).then(db => {
                    console.log("Database creada: "+ DBname)
                    this.database = db;
                    return true;
                }, error => {
                    console.log("Error creando Database: ", error);
                    return false;
                });
            }
    }
    
    CreateTable(Db, TBLname, Campos){
        if (this.database)
        {
            this.database.execSQL("CREATE TABLE IF NOT EXISTS " + TBLname + " ( " + Campos + ")");
            console.log("Tabla " +TBLname +" creada");
        }
        else
        {
            console.dir("Error al crear la Tabla " +TBLname +": ", this.database.error);
        }
    }

    getDB(fnOk, fnError) {
        return new sqlite("mi_db_logs", (err, db) => {
            if(err) {
                console.error("Error al abrir db!", err);
            } else {
                console.log("Está la db abierta: ", db.isOpen() ? "Sí" : "No");
                this.database=db;
                db.execSQL("CREATE TABLE IF NOT EXISTS logs (id INTEGER PRIMARY KEY AUTOINCREMENT, texto TEXT)")
                    .then((id) => {
                        console.log("CREATE TABLE OK");
                        fnOk(db);
                    }, (error) => {
                        console.log("CREATE TABLE ERROR", error);
                        fnError(error);
                    });
            }
        });
    }

    agregar(s: string)  {
        this.getDB((db) => {
            db.execSQL("INSERT INTO favoritos (texto) VALUES (?)", [s], 
                (err, id) => console.log("nuevo insert favorito: ", id));
        }, () => console.log("error on getDB"));

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
        this.getDB((db) => {
            this.database.all("SELECT * FROM favoritos").then(rows => {
                this.noticiero = [];
                for(var row in rows) {
                    this.noticiero.push({
                        "ID": rows[row][1],
                        "Titulo": rows[row][2]
                    });
                }
            }, error => {
                console.log("SELECT ERROR", error);
            });
        }, () => console.log("error on getDB"));
        return getJSON(this.api + "/favs");
    }

    buscar(s: string) {
        this.getDB((db) => {
            db.execSQL("INSERT INTO logs(texto) VALUES (?)", [s], 
                (err, id) => console.log("nuevo id: ", id));
        }, () => console.log("error on getDB"));
        
        const documentId = this.databaseDoc.createDocument({ texto: s });
        console.log("nuevo id couchbase: ", documentId); 

        return getJSON(this.api + "/get?q=" +s);
    } 

}