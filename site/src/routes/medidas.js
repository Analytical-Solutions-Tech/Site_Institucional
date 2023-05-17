var express = require("express");
var router = express.Router();

var medidaController = require("../controllers/medidaController");

router.get("/ultimas/:idTransporte", function (req, res) {
    medidaController.pesquisarMedidas(req, res);
});

module.exports = router;