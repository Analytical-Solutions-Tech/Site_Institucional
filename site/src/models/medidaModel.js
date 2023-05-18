var database = require("../database/config");

function pesquisarMedidas(idTransporte) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `
            select * from temperatura_por_transporte JOIN historicoLeitura
            on historicoLeitura.idLeitura = temperatura_por_transporte.fkLeitura
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
            SELECT fkCliente as cliente_id, fkLeitura as leitura_id, fkSensor as sensor_id from temperatura_por_transporte
            WHERE idTransporte = ${idTransporte}
            order by idTransporte desc 
            `;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = ` 
            SELECT fkCliente as cliente_id, fkLeitura as leitura_id, fkSensor as sensor_id from temperatura_por_transporte
            WHERE idTransporte = ${idTransporte}
            order by idTransporte desc
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
