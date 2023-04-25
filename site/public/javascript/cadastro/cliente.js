function login() {
    var emailLogin = document.querySelector('#input-email-login').value;
    var senhaLogin = document.querySelector('#input-senha-login').value;
    var modalShow = document.getElementById('modal-container')

    if (senhaLogin == "123" && emailLogin == "healthyfish@sptech.com") {
        window.location.href = "../../ChartJs/dashboard.html";
    } else {
        modalShow.style.display = "flex"
    }
}

function cadastro() {
    var cpf = Number(input_cpf.value);
    var cnpj = Number(input_cnpj.value);

    if (cpf.length == 11) {
        console.log("cpf")
        //campos para cadastro de cpf
    } else if (cnpj.length == 14) {
        console.log("cnpj")
        //capos para cadastro de cnpj
    } else {
        console.log("erro")
        // dados incorretos
    }
}

function disableModal() {
    var modalShow = document.getElementById('modal-container')
    modalShow.style.display = "none"
}