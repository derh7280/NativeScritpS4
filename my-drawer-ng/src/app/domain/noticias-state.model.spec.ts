import { InitMyDataAction, intializeNoticiasState, Noticia, NoticiasState, NuevaNoticiaAction, reducerNoticias } from "./noticias-state.model";

// var noticias_state_model=require("/app/domain/noticias-state.model");

describe('reducersNoticias', () => {
    it('should reduce init data', () => {
        // setup
        const prevState : NoticiasState = intializeNoticiasState();
        const action : InitMyDataAction = new InitMyDataAction(['noticia 1', 'noticia 2']);
        // action
        const newState : NoticiasState = reducerNoticias(prevState, action);
        // assertions
        expect(newState.items.length).toEqual(2);
        expect(newState.items[0].titulo).toEqual('noticia 1');
        // tear down -> por ejemplo borrar algo de BD
    });

    it('should reduce new item added', () => {
        const prevState: NoticiasState = intializeNoticiasState();
        const action: NuevaNoticiaAction = new NuevaNoticiaAction(new Noticia('noticia 3'));
        const newState: NoticiasState = reducerNoticias(prevState, action);
        expect(newState.items.length).toEqual(1);
        expect(newState.items[0].titulo).toEqual('noticia 3');
    });

    it('should reduce new item added v2', () => {
        const prevState: NoticiasState = intializeNoticiasState();
        const action: NuevaNoticiaAction = new NuevaNoticiaAction(new Noticia('noticia 3'));
        const newState: NoticiasState = reducerNoticias(prevState, action);
        expect(newState.items.length).toEqual(1);
        expect(newState.items[0].titulo).toEqual('noticia 3');
    });
})