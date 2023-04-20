function login(){
    var email = input_email.value;
    var senha = input_senha.value;

    if(senha == "123" && email == "healthyfish@sptech.com"){
        alert("Login com sucesso!, acesso ao dashboard")
    } else {
        alert("Login ou senha incorretos!")
    }
}

function cadastro(){
    var cpf = Number(input_cpf.value);
    var cnpj = Number(input_cnpj.value);

    if(cpf.length == 11){
        console.log("cpf")
        //campos para cadastro de cpf
    } else if(cnpj.length == 14){
        console.log("cnpj")
        //capos para cadastro de cnpj
    } else {
        console.log("erro")
        // dados incorretos
    }
}