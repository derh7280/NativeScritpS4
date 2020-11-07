import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { ActivityIndicator, Application, TextField } from "@nativescript/core";
import { NoticiasService } from "../domain/noticias.service";
import { ItemEventData } from "@nativescript/core/ui/list-view"
// import { MinLenDirective } from "../directivas/minLen.validator"; 

@Component({
    selector:"EditionForm",
    template: 
    `<FlexboxLayout flexDirection="column">
        <TextField #txtUser="ngModel" [(ngModel)]="txtUserValue" hint="Ingresar texto..." required  minlen="4"></TextField>
        <Label *ngIf="txtUser.hasError('required')" text="Nombre de usuario es obligatorio"></Label>
    </FlexboxLayout>
    <Button text="Guardar" class="-primary" (tap)="onButtonTap()" *ngIf="txtUser.valid"></Button>
   ` 
})

export class EditionFormComponent implements OnInit{
    txtUserValue: string = "";
    @Output() search: EventEmitter<string> = new EventEmitter();
    @Input() inicial: string; 

    // constructor(public noticias: NoticiasService) {
    //     // Use the component constructor to inject providers.
    // }

    onButtonTap(): void{
        console.log(this.txtUserValue);
        if(this.txtUserValue.length > 2) 
        {
            this.search.emit(this.txtUserValue);
        }
    }

    ngOnInit(){
        this.txtUserValue=this.inicial;
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>Application.getRootView();
        sideDrawer.showDrawer();
    }
}
 