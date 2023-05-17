var medidaModel = require("../models/medidaModel");

function pesquisarMedidas(req, res) {

    var idTransporte = req.params.idTransporte;
    var fkCliente = req.params.fkCliente;

    medidaModel.pesquisarMedidas(idTransporte, fkCliente).then(function (resultado) {
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
    pesquisarMedidas
}