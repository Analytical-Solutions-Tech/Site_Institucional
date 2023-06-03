var usuarioModel = require("../models/usuarioModel");
var forge = require('node-forge');

function entrar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    console.log(email, senha);
    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {
        usuarioModel.entrar(email, senha)
            .then(
                function (resultado) {
                    console.log(`\nResultados encontrados: ${resultado.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String

                    if (resultado.length == 1) {
                        console.log(resultado);
                        res.json(resultado[0]);
                    } else if (resultado.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function cadastrar(req, res) {

    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var celular = req.body.celularServer;
    var cpf = req.body.cpfServer;
    var cnpj = req.body.cnpjServer;

    console.log(cnpj);

    // Faça as validações dos valores
    if (nome == undefined) {
        res.status(400).send("Seu nome está indefinida!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está indefinida!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else if (celular == undefined) {
        res.status(400).send("Seu celular está indefinida!");
    } else if (cpf == undefined) {
        res.status(400).send("Seu CPF está indefinida!");
    } else {
        console.log('Esou entrando na pesquisarCNPJ()');
        console.log(`CNPJ: ${cnpj}`);
        pesquisarCNPJ(cnpj);
    }
    // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
    function pesquisarCNPJ(cnpj_cadastro) {
        usuarioModel.pesquisarCNPJ(cnpj_cadastro).then(
            function (resultado) {
                if (resultado.length >= 1) {
                    usuarioModel.cadastrar(cpf, nome, celular, email, senha, resultado[0].idCliente).then(
                        function (resultado) {
                            console.log(resultado);
                            res.json(resultado);
                        }).catch(
                            function (erro) {
                                console.log(erro);
                                console.log(
                                    "\nHouve um erro ao realizar o cadastro! Erro: ",
                                    erro.sqlMessage
                                );
                                res.status(500).json(erro.sqlMessage);
                            }
                        )
                } else {
                    console.log("cnpj inválido");
                    res.status(403).send("CNPJ inválido");
                }
            }
        ).catch(function (erro) {
            console.log(erro);
            console.log(
                "\nHouve um erro ao realizar o cadastro! Erro: ",
                erro.sqlMessage
            );
            res.status(500).json(erro.sqlMessage);
        }
        );
    }
}

module.exports = {
    entrar,
    cadastrar,
}