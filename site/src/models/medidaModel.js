var database = require("../database/config");

function pesquisarMedidas(idTransporte) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `
            select * from temperatura_por_transporte JOIN historicoLeitura
            on historicoLeitura.fkTemperaturaTransporte = temperatura_por_transporte.idTransporte
            WHERE idTransporte = ${idTransporte} 
        `;

    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function pesquisarMedidasTempoReal(idTransporte) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `
            select * from temperatura_por_transporte JOIN historicoLeitura
            on historicoLeitura.fkTemperaturaTransporte = temperatura_por_transporte.idTransporte
            WHERE idTransporte = ${idTransporte} 
            `;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = ` 
            select * from temperatura_por_transporte JOIN historicoLeitura
            on historicoLeitura.fkTemperaturaTransporte = temperatura_por_transporte.idTransporte
            WHERE idTransporte = ${idTransporte} 
            order by data_hora desc
            `;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


module.exports = {
    pesquisarMedidas,
    pesquisarMedidasTempoReal
}
