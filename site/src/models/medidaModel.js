var database = require("../database/config");

function pesquisarMedidas(idTransporte) {

    instrucaoSql = ''

     if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `
        SELECT * FROM temperatura_por_transporte
            WHERE idTransporte = ${idTransporte} 
        `;

    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    pesquisarMedidas
}
