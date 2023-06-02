var express = require("express");
var router = express.Router();

var medidaController = require("../controllers/medidaController");

router.get("/ultimas/:cliente_sensor_transporte", function (req, res) {
    medidaController.pesquisarMedidas(req, res);
});

router.get("/tempo-real/:idTransporte", function (req, res) {
    medidaController.pesquisarMedidasTempoReal(req, res);
})

router.get("/cliente/:fkCliente", function (req, res) {
    medidaController.pesquisarFkCliente(req, res);
});

router.get("/buscar_transporte_e_sensores/:fkCliente", function (req, res) {
    medidaController.buscar_transporte_e_sensores(req, res);
});

module.exports = router;