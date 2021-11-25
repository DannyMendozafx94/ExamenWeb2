// EXPORTMOS NUESTROS MODULOS E INCLUIMOS LA RUTA DE TASK,JS DONDE ESTA GUARDADOS LOS DATOS DE MONGO DB
var express = require('express');
var router = express.Router();
var nuevo = require('../models/contratos');

const cors = require('cors');


const app = express();

app.use(cors()).use(express.json());


router.get('/', async(req, res) => {
    var contrato = await nuevo.find();
    res.render('index', {
        contrato
    });
});


router.get('/', async(req, res) => {
    var contrato = await nuevo.find();
    res.render('index', {
        contrato
    });
});

// AÑADIMSO NUESTRAS DATOS DEL VEHICULO
router.post('/add', async(req, res, next) => {
    var contrato = new carrito(req.body);
    await contrato.save();
    console.log(`Datos${contrato}`);
    res.redirect('/');
});


router.get('/eliminar/:id', async(req, res, next) => {
    let { id } = req.params;
    await nuevo.remove({ _id: id });

    res.redirect('/');

});


module.exports = router;