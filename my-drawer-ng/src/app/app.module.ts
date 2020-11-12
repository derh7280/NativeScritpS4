import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "@nativescript/angular";
import { NativeScriptUISideDrawerModule } from "nativescript-ui-sidedrawer/angular";
import { NativeScriptUIDataFormModule } from "nativescript-ui-dataform/angular";

import { EffectsModule} from "@ngrx/effects";
import { ActionReducerMap, StoreModule as NgRxStoreStoreModule } from "@ngrx/store";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { intializeNoticiasState, NoticiasEffects, NoticiasState, reducerNoticias } from "./domain/noticias-state.model";
import { NoticiasService } from "./domain/noticias.service";
import { Person } from "./domain/personas.service";

//redux init
//tslint: disable-next-line: interface-name
export interface AppState {
    noticias: NoticiasState;
}

const reducers: ActionReducerMap<AppState> = {
    noticias: reducerNoticias
};

const reducersInitalState = {
    noticias: intializeNoticiasState()
};
// fin redux init

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        AppRoutingModule,
        NativeScriptModule,
        NativeScriptUISideDrawerModule,
        NativeScriptUIDataFormModule,
        NgRxStoreStoreModule.forRoot(reducers, { initialState: reducersInitalState}),
        EffectsModule.forRoot([NoticiasEffects])
    ],
    providers: [
                NoticiasService,
                Person
    ],

    declarations: [
        AppComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
