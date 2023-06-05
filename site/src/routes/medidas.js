var express = require("express");
var router = express.Router();

var medidaController = require("../controllers/medidaController");

router.get("/ultimas/:cliente_sensor_transporte", function (req, res) {
    medidaController.pesquisarMedidas(req, res);
});

router.get("/tempo-real/:cliente_sensor_transporte", function (req, res) {
    medidaController.pesquisarMedidasTempoReal(req, res);
})

router.get("/cliente/:fkCliente", function (req, res) {
    medidaController.pesquisarFkCliente(req, res);
});

router.get("/class_temperatura/:fkTemperaturaTransporte", function (req, res) {
    medidaController.classificacaoTemperatura(req, res);
});

module.exports = router;