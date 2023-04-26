function login() {
    var emailLogin = document.querySelector('#input-email-login').value;
    var senhaLogin = document.querySelector('#input-senha-login').value;
    var modalShow = document.getElementById('modal-container')

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
    if (cadastroTelefone.value == "" || cadastroTelefone.value.length != 15) {
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
    if (contadorCamposValidos == 5) {
        window.location.href = "./dashboard.html";
    }
}

function disableModal() {
    var modalShow = document.getElementById('modal-container')
    modalShow.style.display = "none"
}