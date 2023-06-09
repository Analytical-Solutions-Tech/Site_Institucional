var database = require("../database/config");

function pesquisarMedidas(idTransporte) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `
        select * from temperatura_por_transporte 
        JOIN historicoleitura 
        ON historicoleitura.fkTemperaturaTransporte = temperatura_por_transporte.idTransporte 
        where idTransporte = ${idTransporte} order by data_hora desc limit 10;
        `;

    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function pesquisarMedidasTempoReal(idTransporte) {

    if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = ` 
            select * from temperatura_por_transporte 
            JOIN historicoleitura 
            ON historicoleitura.fkTemperaturaTransporte = temperatura_por_transporte.idTransporte 
            where idTransporte = ${idTransporte} 
            order by data_hora desc limit 1;
            `;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function classificacaoTemperatura(fkTemperaturaTransporte) {
    console.log(fkTemperaturaTransporte);
    if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = ` 
            select count(descricao) qtdDesc, descricao from classificacao_temperatura join historicoLeitura on classificacao_temperatura.fk_historicoLeitura = historicoLeitura.idLeitura
                where fkTemperaturaTransporte = ${fkTemperaturaTransporte}
                    group by descricao desc;
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
    pesquisarFkCliente,
    classificacaoTemperatura
}
