var medidaModel = require("../models/medidaModel");

function pesquisarMedidas(req, res) {

    console.log("Estou na pesquisarMedidas()")
    var idTransporte = req.params.cliente_sensor_transporte.idTransporte;
    var fkCliente = req.params.cliente_sensor_transporte.fkCliente;
    var fkSensor = req.params.cliente_sensor_transporte.fkSensor;


    medidaModel.pesquisarMedidas(idTransporte, fkCliente, fkSensor).then(function (resultado) {
        if (resultado.length > 0) {
            console.log(resultado);
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}



function pesquisarMedidasTempoReal(req, res) {

    console.log("Estou na pesquisarMedidasTempoReal()")
    var idTransporte = req.params.cliente_sensor_transporte.idTransporte;
    var fkCliente = req.params.cliente_sensor_transporte.fkCliente;
    var fkSensor = req.params.cliente_sensor_transporte.fkSensor;

    console.log(`Recuperando medidas em tempo real`);

    medidaModel.pesquisarMedidasTempoReal(idTransporte, fkCliente, fkSensor).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
    pesquisarMedidas,
    pesquisarMedidasTempoReal
}