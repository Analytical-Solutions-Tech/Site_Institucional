var medidaModel = require("../models/medidaModel");

function pesquisarMedidas(req, res) {

    var idTransporte = req.params.cliente_sensor_transporte;

    medidaModel.pesquisarMedidas(idTransporte).then(function (resultado) {
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

    var idTransporte = req.params.cliente_sensor_transporte;

    medidaModel.pesquisarMedidasTempoReal(idTransporte).then(function (resultado) {
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

function classificacaoTemperatura(req, res) {

    var fkHistoricoLeitura = req.params.fkHistoricoLeitura;

    medidaModel.classificacaoTemperatura(fkHistoricoLeitura).then(function (resultado) {
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

    var fkCliente = req.params.fkCliente;

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

module.exports = {
    pesquisarMedidas,
    pesquisarMedidasTempoReal,
    pesquisarFkCliente,
    classificacaoTemperatura,
}