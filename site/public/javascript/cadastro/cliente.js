function login(){
    var email = input_email.value;
    var senha = input_senha.value;

    if(senha == "" && email == ""){
        alert("Login com sucesso!, acesso ao dashboard")
    } else {
        alert("Login ou senha incorretos!")
    }
}

function cadastro(){
    var cpf = Number(input_cpf.value);
    var cnpj = Number(input_cnpj);


}