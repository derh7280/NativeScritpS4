var noticias_state_model = require("~/app/domain/noticias-state.model");

describe('reducersNoticias', () => {
    it("should reduce init data", function () {
        // setup
        var prevState = noticias_state_model.intializeNoticiasState();
        var action = new noticias_state_model.InitMyDataAction(["noticia 1", "noticia 2"]);
        // action
        var newState = noticias_state_model.reducerNoticias(prevState, action);
        // assertions
        expect(newState.items.length).toEqual(2);
        expect(newState.items[0].titulo).toEqual("noticia 1");
    });
 
    it("should reduce new item added", function () {
        var prevState = noticias_state_model.intializeNoticiasState();
        var action = new noticias_state_model.NuevaNoticiaAction(new noticias_state_model.Noticia("noticia 3"));
        var newState = noticias_state_model.reducerNoticias(prevState, action);
        expect(newState.items.length).toEqual(1);
        expect(newState.items[0].titulo).toEqual("noticia 3");
    });

    it('should reduce new item added v2', () => {
        const prevState = noticias_state_model.intializeNoticiasState();
        const action = new noticias_state_model.NuevaNoticiaAction(new noticias_state_model.Noticia('noticia 3'));
        const newState = noticias_state_model.reducerNoticias(prevState, action);
        expect(newState.items.length).toEqual(1);
        expect(newState.items[0].titulo).toEqual('noticia 3');
    }); 
})