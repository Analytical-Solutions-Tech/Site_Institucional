var medidaModel = require("../models/medidaModel");

function pesquisarMedidas(req, res) {

    var idTransporte = req.params.idTransporte;

    medidaModel.pesquisarMedidas(idTransporte).then(function (resultado) {
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



function pesquisarMedidasTempoReal(req, res) {

    var idTransporte = req.params.idTransporte;

    console.log(`Recuperando medidas em tempo real`);

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

module.exports = {
    pesquisarMedidas,
    pesquisarMedidasTempoReal
}