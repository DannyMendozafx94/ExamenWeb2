var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var contrato = Schema({
    FechaInicio: {
        type: String
    },
    TipoServicio: {
        type: String,

    },
    MesesContrato: {
        type: String,


    },
    TotalContrato: {
        type: String,

    },
    MesesTranscurrido: {
        type: String,

    },
    TotalAbono: {
        type: String
    },


});


module.exports = mongoose.model('Datos', contrato);