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

    if (
        cadastroCPF.value == "" ||
        cadastroNome.value == "" ||
        cadastroTelefone.value == "" ||
        cadastroEmail.value == "" ||
        cadastroSenha.value == "") {

        modal_titulo.innerHTML = "Erro ao cadastrar"
        modal_txt.innerHTML = "Verifique se todos os campos estão preenchidos corretamente"
        modalShow.style.display = "flex"

        if (cadastroCPF.value == "" || cadastroCPF.value.length != 11) {
            cadastroCPF.style.borderBottomColor = "red"
            cadastroCPF.style.color = "red"
        } else {
            cadastroCPF.style.borderBottomColor = "white"
            cadastroCPF.style.color = "white"
        }
        if (cadastroNome.value == "") {
            cadastroNome.style.borderBottomColor = "red"
            cadastroNome.style.color = "red"
        } else {
            cadastroNome.style.borderBottomColor = "white"
            cadastroNome.style.color = "white"
        }
        if (cadastroTelefone.value == "" || cadastroTelefone.value.length != 15) {
            cadastroTelefone.style.borderBottomColor = "red"
            cadastroTelefone.style.color = "red"
        } else {
            cadastroTelefone.style.borderBottomColor = "white"
            cadastroTelefone.style.color = "white"
        }
        if (cadastroEmail.value == "") {
            cadastroEmail.style.borderBottomColor = "red"
            cadastroEmail.style.color = "red"
        } else {
            cadastroEmail.style.borderBottomColor = "white"
            cadastroEmail.style.color = "white"
        }
        if (cadastroSenha.value == "") {
            cadastroSenha.style.borderBottomColor = "red"
            cadastroSenha.style.color = "red"
        } else {
            cadastroSenha.style.borderBottomColor = "white"
            cadastroSenha.style.color = "white"
        }
        modal_titulo.innerHTML = "Erro ao cadastrar"
        modal_txt.innerHTML = "Verifique se todos os campos estão preenchidos corretamente"
        modalShow.style.display = "flex"
    } else {
        cadastroCPF.style.borderBottomColor = "white"
        cadastroCPF.style.color = "white"
        cadastroNome.style.borderBottomColor = "white"
        cadastroNome.style.color = "white"
        cadastroTelefone.style.borderBottomColor = "white"
        cadastroTelefone.style.color = "white"
        cadastroEmail.style.borderBottomColor = "white"
        cadastroEmail.style.color = "white"
        cadastroSenha.style.borderBottomColor = "white"
        cadastroSenha.style.color = "white"
    }

}

function disableModal() {
    var modalShow = document.getElementById('modal-container')
    modalShow.style.display = "none"
}