import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "@nativescript/angular";

const routes: Routes = [
    { path: "", redirectTo: "/home", pathMatch: "full" },
    { path: "home", loadChildren: () => import("~/app/home/home.module").then((m) => m.HomeModule) },
    { path: "browse", loadChildren: () => import("~/app/browse/browse.module").then((m) => m.BrowseModule) },
    { path: "listado", loadChildren: () => import("~/app/listado/listado.module").then((m) => m.ListadoModule) },
    { path: "vista", loadChildren: () => import("~/app/vista/vista.module").then((m) => m.VistaModule) },
    { path: "search", loadChildren: () => import("~/app/search/search.module").then((m) => m.SearchModule) },
    { path: "featured", loadChildren: () => import("~/app/featured/featured.module").then((m) => m.FeaturedModule) },
    { path: "settings", loadChildren: () => import("~/app/settings/settings.module").then((m) => m.SettingsModule) },
    { path: "support", loadChildren: () => import("~/app/support/support.module").then((m) => m.SupportModule) },
    { path: "events", loadChildren: () => import("~/app/events/events.module").then((m) => m.EventsModule) },
    { path: "formedicion", loadChildren: () => import("~/app/formEdicion/formedicion.module").then((m) => m.FormedicionModule) },
    { path: "usoplugins", loadChildren: () => import("~/app/usoPlugins/usoplugins.module").then((m) => m.UsopluginsModule) },
    { path: "compartir", loadChildren: () => import("~/app/usoPlugins/compartir/compartir.module").then((m) => m.CompartirModule) },
    { path: "email", loadChildren: () => import("~/app/usoPlugins/email/email.module").then((m) => m.EmailModule) },
    { path: "camara", loadChildren: () => import("~/app/usoPlugins/camara/camara.module").then((m) => m.CamaraModule) },
    { path: "plataforma", loadChildren: () => import("~/app/usoPlugins/plataforma/plataforma.module").then((m) => m.PlataformaModule) },
    { path: "estadored", loadChildren: () => import("~/app/usoPlugins/estado/estado.module").then((m) => m.EstadoModule) },
    { path: "mapas", loadChildren: () => import("~/app/usoPlugins/mapa/mapa.module").then((m) => m.MapaModule) }
]; 

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
