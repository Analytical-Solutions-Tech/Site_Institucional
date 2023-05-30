function login() {
    var emailLogin = document.querySelector('#input-email-login').value;
    var senhaLogin = document.querySelector('#input-senha-login').value;
    var modalShow = document.getElementById('modal-container')

    modal_titulo.innerHTML = "Erro ao fazer login"
    modal_txt.innerHTML = "Verfifique se o email e a senha estão corretos e tente novamente"

    if (senhaLogin == "123" && emailLogin == "healthyfish@sptech.com") {
        window.location.href = "./dashboard.html";
    } else {
        modalShow.style.display = "flex"
    }
}

function cadastro() {
    var modalShow = document.getElementById('modal-container')
    var cadastroCPF = document.getElementById('input-cpf-cadastro')
    var cadastroNome = document.getElementById('input-nome-cadastro')
    var cadastroTelefone = document.getElementById('input-celular-cadastro')
    var cadastroEmail = document.getElementById('input-email-cadastro')
    var cadastroSenha = document.getElementById('input-senha-cadastro')
    var cadastroCNPJ = document.getElementById('input-cnpj-cadastro')
    var contadorCamposValidos = 0;

    if (cadastroCPF.value == "" || cadastroCPF.value.length != 11) {
        cadastroCPF.style.borderBottomColor = "red"
        cadastroCPF.style.color = "red"
        modal_titulo.innerHTML = "Erro ao cadastrar"
        modal_txt.innerHTML = "Verifique se todos os campos estão preenchidos corretamente"
        modalShow.style.display = "flex"
    } else {
        cadastroCPF.style.borderBottomColor = "white"
        cadastroCPF.style.color = "white"
        contadorCamposValidos++;
    }
    if (cadastroNome.value == "") {
        cadastroNome.style.borderBottomColor = "red"
        cadastroNome.style.color = "red"
        modal_titulo.innerHTML = "Erro ao cadastrar"
        modal_txt.innerHTML = "Verifique se todos os campos estão preenchidos corretamente"
        modalShow.style.display = "flex"
    } else {
        cadastroNome.style.borderBottomColor = "white"
        cadastroNome.style.color = "white"
        contadorCamposValidos++
    }
    if (cadastroTelefone.value == "" || cadastroTelefone.value.length != 13) {
        cadastroTelefone.style.borderBottomColor = "red"
        cadastroTelefone.style.color = "red"
        modal_titulo.innerHTML = "Erro ao cadastrar"
        modal_txt.innerHTML = "Verifique se todos os campos estão preenchidos corretamente"
        modalShow.style.display = "flex"
    } else {
        cadastroTelefone.style.borderBottomColor = "white"
        cadastroTelefone.style.color = "white"
        contadorCamposValidos++
    }
    if (cadastroEmail.value == "") {
        cadastroEmail.style.borderBottomColor = "red"
        cadastroEmail.style.color = "red"
        modal_titulo.innerHTML = "Erro ao cadastrar"
        modal_txt.innerHTML = "Verifique se todos os campos estão preenchidos corretamente"
        modalShow.style.display = "flex"
    } else {
        cadastroEmail.style.borderBottomColor = "white"
        cadastroEmail.style.color = "white"
        contadorCamposValidos++
    }
    if (cadastroSenha.value == "") {
        cadastroSenha.style.borderBottomColor = "red"
        cadastroSenha.style.color = "red"
        modal_titulo.innerHTML = "Erro ao cadastrar"
        modal_txt.innerHTML = "Verifique se todos os campos estão preenchidos corretamente"
        modalShow.style.display = "flex"
    } else {
        cadastroSenha.style.borderBottomColor = "white"
        cadastroSenha.style.color = "white"
        contadorCamposValidos++
    }
    if (cadastroCNPJ.value == "" || cadastroCNPJ.value.length != 14) {
        cadastroCNPJ.style.borderBottomColor = "red"
        cadastroCNPJ.style.color = "red"
        modal_titulo.innerHTML = "Erro ao cadastrar"
        modal_txt.innerHTML = "Verifique se todos os campos estão preenchidos corretamente"
        modalShow.style.display = "flex"
    } else {
        cadastroCNPJ.style.borderBottomColor = "white"
        cadastroCNPJ.style.color = "white"
        contadorCamposValidos++
    }
    if (contadorCamposValidos == 6) {
        window.location.href = "./dashboard.html";
    }
}

function disableModal() {
    var modalShow = document.getElementById('modal_container')
    modalShow.style.display = "none"
}

function entrar() {

    var emailVar = input_email_login.value;

    var senhaCript = forge.md.sha256.create();
    senhaCript.update(`${input_senha_login.value}`);
    //console.log(senhaVar.digest().toHex());
    var senhaVar = senhaCript.digest().toHex();

    if (emailVar == "" || senhaVar == "") {
        modal_container.style.display = "flex";
        modal_titulo.innerHTML = "Erro ao fazer login"
        modal_txt.innerHTML = "Verfifique se o email e a senha estão corretos e tente novamente"
        return false;
    } else {
    }

    console.log("FORM LOGIN: ", emailVar);
    console.log("FORM SENHA: ", senhaVar);

    fetch("/usuarios/autenticar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            emailServer: emailVar,
            senhaServer: senhaVar
        })

    }).then(function (resposta) {
        console.log("ESTOU NO THEN DO entrar()!")

        if (resposta.ok) {
            resposta.json().then(json => {
                console.log(JSON.stringify(json));

                sessionStorage.EMAIL_USUAIRO = json.Email;
                sessionStorage.NOME_USUARIO = json.Nome;
                sessionStorage.ID_USUARIO = json.idUsuario;
                sessionStorage.FK_CLIENTE = json.fkEmpresas;

                setTimeout(function () {
                    window.location = "./dashboard.html";
                }, 1000); // apenas para exibir o loading
            });
        } else {
            modal_container.style.display = "flex";
            modal_titulo.innerHTML = "Erro ao fazer login"
            modal_txt.innerHTML = "Verfifique se o email e a senha estão corretos e tente novamente"

            resposta.text().then(texto => {
                console.error(texto);
            });
        }

    }).catch(function (erro) {
        console.log(erro);
    })

    return false;
}

function cadastrar() {
    var var_cnpj = input_cnpj_cadastro.value;
    var var_cpf = input_cpf_cadastro.value;
    var var_nome = input_nome_cadastro.value;
    var var_celular = input_celular_cadastro.value;
    var var_email = input_email_cadastro.value;

    var senha_cript = forge.md.sha256.create();
    senha_cript.update(`${input_senha_cadastro.value}`);
    var var_senha = senha_cript.digest().toHex();

    //Recupere o valor da nova input pelo nome do id
    // Agora vá para o método fetch logo abaixo

    if (var_nome == "" || var_email == "" || var_senha == "" || var_celular == "" || var_cpf == "" || var_cnpj == "") {
        return console.log('Verifique se os campos do cadastro não estão vazios');
    }
    else {
    }

    // Enviando o valor da nova input
    fetch("/usuarios/cadastrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            // crie um atributo que recebe o valor recuperado aqui
            // Agora vá para o arquivo routes/usuario.js
            nomeServer: var_nome,
            emailServer: var_email,
            senhaServer: var_senha,
            celularServer: var_celular,
            cnpjServer: var_cnpj,
            cpfServer: var_cpf,
        })
    }).then(function (resposta) {

        console.log("resposta: ", resposta);

        if (resposta.ok) {
            setTimeout(() => {
                window.location = "./dashboard.html";
            }, "2000")

            limparFormulario();
            finalizarAguardar();
        } else {
            throw ("Houve um erro ao tentar realizar o cadastro!");
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });

    return false;
}
