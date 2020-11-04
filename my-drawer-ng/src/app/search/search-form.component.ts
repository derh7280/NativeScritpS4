import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { ActivityIndicator, Application, TextField } from "@nativescript/core";
import { NoticiasService } from "../domain/noticias.service";
import { ItemEventData } from "@nativescript/core/ui/list-view"
import { MinLenDirective } from "../directivas/minLen.validator"; 

@Component({
    selector:"SearchForm",
    template: 
    // `<TextField [(ngModel)]="textFieldValue" hint="Ingresar texto ... ejemplo Hotel"></TextField>
    // <Button text="Buscar" (tap)="onButtonTap()"></Button>
    // `
    `<FlexboxLayout flexDirection="column">
        <TextField #texto="ngModel" [(ngModel)]="textFieldValue" hint="Ingresar texto..." required  minlen="4"></TextField>
        <Label *ngIf="texto.hasError('required')" text="Campo obligatorio"></Label>
        <Label *ngIf="!texto.hasError('required') && texto.hasError('minlen')" text="El tamaño del campo debe ser de 4 o mas caracteres"></Label> 
    </FlexboxLayout>
    <Button text="Buscar" class="-primary" (tap)="onButtonTap()" *ngIf="texto.valid"></Button> 
    
    <Button [text]="textoBoton" class="-outline btn btn-active" (tap)="(activityIndicator.busy =!activityIndicator.busy)"></Button>
    <ActivityIndicator #activityIndicator busy="true" (busyChange)="cambio($event)" width="100" height="100" class="activity-indicator"></ActivityIndicator>
   ` 
})

export class SearchFormComponent implements OnInit{
    textFieldValue: string = "";
    textoBoton: string="Parar";
    @Output() search: EventEmitter<string> = new EventEmitter();
    @Input() inicial: string;
    // constructor(public noticias: NoticiasService) {
    //     // Use the component constructor to inject providers.
    // }

    cambio (e) {
        let indicator = <ActivityIndicator> e.object;
        if (indicator.busy===true) {
            this.textoBoton="Parar";
        }
        else
        {
            this.textoBoton="Tocame";
        }
        console.log("indicator.busy: " + indicator.busy);
        } 
       
    onButtonTap(): void{
        console.log(this.textFieldValue);
        if(this.textFieldValue.length > 2) 
        {
            this.search.emit(this.textFieldValue);
        }
    }

    ngOnInit(){
        this.textFieldValue=this.inicial;
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>Application.getRootView();
        sideDrawer.showDrawer();
    }
}
 