/// CREAR SERVIDOR DE EXPRESS
const express = require('express');
const morgan = require('morgan')

const path = require('path');
const cors = require('cors');
//const indica = fs.readFileSync('./index.html');

const app = express();

const { dbConnection } = require('./services/config')
const indexRoutes = require('./routes/index');

class Server {
    constructor() {
            this.app = express();
            this.port = process.env.PORT;

            this.paths = {
                vehiculo: '/api/vehiculo',
                //grupos:'/api/grupos',
                //categorias:'/api/categorias'
            }

            this.conectarDB();
            this.middlewares();
            // this.routes();

        }
        //// ASOCIAR RUTAS, MIDDLEWARES, LEVANTAR BASE DE DATOS
    async conectarDB() {
        await dbConnection();
    }
    middlewares() {
        //  mildewere
        app.set('public', path.join(__dirname, '/public'));
        app.use(cors()).use(express.json());
        app.set('views', path.join(__dirname, '/views'));
        app.set('view engine', 'ejs', 'html');
        app.use(cors()).use(express.json());
        app.use(morgan('dev'));
        app.use(express.urlencoded({ extended: false }))

        app.use('/', indexRoutes);

    }

    routes() {
        app.use(this.paths.vehiculo, require('./views/index.ejs'))


    }

    listen() {

        app.set('puerto', process.env.PORT || 3000);

        app.listen(app.get('puerto'), () => {
            console.log(`SERVIDOR CONECTADO EN EL PUERTO ${app.get('puerto')}`);
        });

    }

}


module.exports = Server;