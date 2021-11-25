/// traer datos de configuracion   PUERTO Y LA CADENA DE CONEXION  MONGODB_CNN Y PORT
require('dotenv').config();
const express = require('express')


const { config } = require('dotenv');
const { Datos } = require('./models');
const morgan = require('morgan');

const axios = require('axios').default;
const cheerio = require('cheerio');
const mongoose = require('mongoose');
const cron = require('node-cron');

const cors = require('cors');
const Server = require('./server');


const app = express();

app.use(cors()).use(express.json());


/// crear una instancia del servidor y levantarlo


cron.schedule("* * * * *", async() => {
    // TODO: 
    //conectarme a la base de datos

    try {

        // obtener el html de la pAgina de CNN
        const html = await axios.get("http://localhost:3000");
        //Obtener las noticias utilizando cheerio
        const $ = cheerio.load(html.data);
        const FechaInicio = $(".news__title");
        let arregloContrato = [];
        //recorrer los nodos 
        FechaInicio.each((index, element) => {
            const contratos = {
                Placa: $(element).text().toString(),
                // enlace: $(element).children().attr("href")
            };
            arregloContrato = [...arregloContrato, contratos];
        });
        //Agregar en la base de datos
        await Datos.create(arregloContrato);
    } catch (err) {
        console.log(err);
    }

});


const server = new Server();

///LEVANTAR EL SERVIDOR
server.listen();