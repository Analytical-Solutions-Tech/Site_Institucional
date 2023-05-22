var usuarioModel = require("../models/usuarioModel");
var forge = require('node-forge');

var sessoes = [];

function testar(req, res) {
    console.log("ENTRAMOS NA usuarioController");
    res.json("ESTAMOS FUNCIONANDO!");
}

function listar(req, res) {
    usuarioModel.listar()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function entrar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    
    var cript_senha = forge.hmac.create();
    cript_senha.start('sha256', `${senha}`);
    cript_senha.update('what do ya want for nothing?');

    console.log(cript_senha.digest().toHex());

    var md = forge.md.sha256.create();
    md.update('The quick brown fox jumps over the lazy dog');
    console.log(md.digest().toHex());
    console.log(md.encode().toHex());
    

    var decrypt = '';
    decrypt += decrypt.update(md);
    console.log(decrypt.digest().toString());

    var md = forge.md.sha256.create();
    md.update('The quick brown fox jumps over the lazy dog');
    console.log(md.digest().toHex());


    var decript_senha = forge.hmac.decode
        console.log(cript_senha.output);

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
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var celular = req.body.celularServer;
    var cnpj = req.body.cnpjServer;
    var cpf = req.body.cpfServer;

    // Faça as validações dos valores
    if (nome == undefined) {
        res.status(400).send("Seu nome está indefinida!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está indefinida!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else if (celular == undefined) {
        res.status(400).send("Seu celular está indefinida!");
    } else if (cnpj == undefined) {
        res.status(400).send("Seu CNPJ está indefinida!");
    } else if (cpf == undefined) {
        res.status(400).send("Seu CPF está indefinida!");
    } else {
        
        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrar(nome, email, senha, celular, cnpj, cpf)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
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
    listar,
    testar
}