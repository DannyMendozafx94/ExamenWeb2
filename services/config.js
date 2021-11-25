const mongoose = require('mongoose');
const { config } = require('dotenv');
const { MONGO_URI } = require('../config');
const dbConnection = async() => {
    try {
        const respuestaConexion = await mongoose.connect(MONGO_URI);
        //await mongoose.connect( process.env.MONGODB_CNN)
        console.log(`CONECTADO A LA BASE DE DATOS `);
    } catch (error) {

        console.log(`ERROR EN LA CONEXION ${error}`);
    }

};
module.exports = {
    dbConnection
};