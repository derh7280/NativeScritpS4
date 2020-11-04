import { Injectable } from "@angular/core";

@Injectable()
export class AgentesService    {
    private agentes: Array<string> = [];

    agregar(s: string)  {
        this.agentes.push(s);
    }

    buscar()    {
        return this.agentes;
    } 
}