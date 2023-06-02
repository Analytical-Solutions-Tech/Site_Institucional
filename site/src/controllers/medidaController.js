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

function pesquisarFkCliente(req, res) {

    console.log("Estou na pesquisarFkCliente()")

    console.log(req.params.fkCliente);
    var fkCliente = req.params.fkCliente;

    console.log(`Recuperando medidas em tempo real`);

    medidaModel.pesquisarFkCliente(fkCliente).then(function (resultado) {
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

function buscar_transporte_e_sensores(req, res) {

    console.log("Estou na buscar_transporte_e_sensores()")

    console.log(req.params.fkCliente);
    var fkCliente = req.params.fkCliente;

    console.log(`Recuperando dos transportes e sensores`);

    medidaModel.buscar_transporte_e_sensores(fkCliente).then(function (resultado) {
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
    pesquisarMedidasTempoReal,
    pesquisarFkCliente,
    buscar_transporte_e_sensores,   
}