import { Injectable } from "@angular/core";

@Injectable()
export class FuncionalidadesService    {
    private funcionalidades: Array<string> = [];

    agregar(s: string)  {
        this.funcionalidades.push(s);
    }

    buscar()    {
        return this.funcionalidades;
    }
}