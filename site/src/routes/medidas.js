var express = require("express");
var router = express.Router();

var medidaController = require("../controllers/medidaController");

router.get("/ultimas/:idTransporte", function (req, res) {
    medidaController.pesquisarMedidas(req, res);
});

router.get("/tempo-real/:idTransporte", function (req, res) {
    medidaController.pesquisarMedidasTempoReal(req, res);
})

module.exports = router;