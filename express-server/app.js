/*
    npm install
    node app.js
*/
var express = require("express"), cors = require('cors');
var app = express();
app.use(express.json());
app.use(cors());
app.listen(3000, () => console.log('Server running en puerto 3000'));

var noticias = [
    "Literatura Paris", "Futbol Barcelona", "Futbol Madrid", "Futbol Medellin", "Politica Montevideo", "Economia Santiago de Chile", "Cocina Mexico DF", "Finanzas Nueva York"
];

//no mutable
function removeItemFromArrNomutable( arr, item ) {
    return arr.filter( function( e ) {
        return e !== item;
    } );
};

//mutable
function removeItemFromArrMutable ( arr, item ) {
    var i = arr.indexOf( item );
    if ( i !== -1 ) {
        arr.splice( i, 1 );
    }
}

app.get("/get", (req, res, next) => 
res.json(noticias.filter((c) => c.toLowerCase().indexOf(req.query.q.toString().toLowerCase()) > -1 )));

var misFavoritos = [];
app.get("/favs", (req, res, next) => res.json(misFavoritos));
app.post("/favs", (req, res, next) => {
    console.log(req.body);
    misFavoritos.push(req.body.nuevo);
    res.json(misFavoritos);
});
app.delete("/favs", (req, res, next) => {
    console.log(req.body);
    // var newFoo = removeItemFromArrNomutable( misFavoritos, req.body.delete);
    //   console.info(newFoo);
    // misFavoritos.push(req.body.delete);
    console.dir("intentando eliminar " + req.body.delete)
    removeItemFromArrMutable(misFavoritos,req.body.delete);
    res.json(misFavoritos);
    console.info(misFavoritos);
});misFavoritos