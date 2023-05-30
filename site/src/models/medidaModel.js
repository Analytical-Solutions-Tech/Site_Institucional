var database = require("../database/config");

function pesquisarMedidas(idTransporte, fkCliente, fkSensor) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `
            select * from temperatura_por_transporte JOIN historicoLeitura
            on historicoLeitura.fkTemperaturaTransporte = temperatura_por_transporte.idTransporte
            WHERE idTransporte = ${idTransporte} AND fkCliente = ${fkCliente} AND fkSensor = ${fkSensor}, 
            limit 10;
        `;

    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function pesquisarMedidasTempoReal(idTransporte, fkCliente, fkSensor) {

    if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = ` 
            select * from temperatura_por_transporte JOIN historicoLeitura
            on historicoLeitura.fkTemperaturaTransporte = temperatura_por_transporte.idTransporte
            WHERE idTransporte = ${idTransporte} AND fkCliente = ${fkCliente} AND fkSensor = ${fkSensor}
            order by data_hora desc limit 1;
            `;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function pesquisarFkCliente(fkCliente) {

    instrucaoSql = ''
    console.log(fkCliente);

    if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `
            select * from temperatura_por_transporte 
                where fkCliente = ${fkCliente};
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
    pesquisarMedidasTempoReal,
    pesquisarFkCliente
}
