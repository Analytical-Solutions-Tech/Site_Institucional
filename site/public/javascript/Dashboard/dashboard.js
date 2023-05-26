// GRÁFICOS DA DASHBOARD

// GRÁFICO DE TEMPERATURA
var EMAIL_USUARIO = sessionStorage.getItem('EMAIL_USUARIO');
var NOME_USUARIO = sessionStorage.getItem('NOME_USUARIO');
var ID_USUARIO = sessionStorage.getItem('ID_USUARIO');

// PEGAR DADOS DO BANCO DE DADOS

var proximaAtualizacao;

var tempColor = document.getElementById('hora_temp');
var tempAviso = document.getElementById('temp_aviso');
var horaTempAviso = document.getElementById('hora_temp_aviso');

window.onload = obterDadosGraficos();

function obterDadosGraficos() {
  obterDadosGrafico(4);
}

// O gráfico é construído com três funções:
// 1. obterDadosGrafico -> Traz dados do Banco de Dados para montar o gráfico da primeira vez
// 2. plotarGrafico -> Monta o gráfico com os dados trazidos e exibe em tela
// 3. atualizarGrafico -> Atualiza o gráfico, trazendo novamente dados do Banco

// Esta função *obterDadosGrafico* busca os últimos dados inseridos em tabela de medidas.
// para, quando carregar o gráfico da primeira vez, já trazer com vários dados.
// A função *obterDadosGrafico* também invoca a função *plotarGrafico*

//     Se quiser alterar a busca, ajuste as regras de negócio em src/controllers
//     Para ajustar o "select", ajuste o comando sql em src/models
function obterDadosGrafico(idTransporte) {

  if (proximaAtualizacao != undefined) {
    clearTimeout(proximaAtualizacao);
  }

  fetch(`/medidas/ultimas/${idTransporte}`).then(function (response) {
    if (response.ok) {
      response.json().then(function (resposta) {
        console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
        resposta.reverse();
        plotarGrafico(resposta, idTransporte);
      });
    } else {
      console.error('Nenhum dado encontrado ou erro na API');
    }
  })
    .catch(function (error) {
      console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });
}

// Esta função *plotarGrafico* usa os dados capturados na função anterior para criar o gráfico
// Configura o gráfico (cores, tipo, etc), materializa-o na página e, 
// A função *plotarGrafico* também invoca a função *atualizarGrafico*
function plotarGrafico(resposta, idTransporte) {

  // Criando estrutura para plotar gráfico - labels
  let labels = [];

  // Criando estrutura para plotar gráfico - dados
  let dados = {
    labels: labels,
    datasets: [
      {
        label: 'Temperatura',
        data: [],
        fill: false,
        borderColor: 'rgb(199, 52, 52)',
        tension: 0.1
      }]
  };

  // Inserindo valores recebidos em estrutura para plotar o gráfico
  for (i = 1; i < resposta.length; i++) {
    var registro = resposta[i];
    var data_hora = new Date(registro.data_hora);

    var dia = data_hora.getDay();
    var mes = data_hora.getMonth();
    var horas = data_hora.getHours();
    var minutos = data_hora.getMinutes();

    if (dia < 10) {
      dia = "0" + dia;
    }
    if (mes < 10) {
      mes = "0" + mes;
    }
    if (horas < 10) {
      horas = "0" + horas;
    }
    if (minutos < 10) {
      minutos = "0" + minutos;
    }

    var horas_minutos = `${horas}:${minutos}`

    var data_hora_formatada = `${dia}/${mes}/${data_hora.getFullYear()} ${horas}:${minutos}`;
    dados.datasets[0].data.push(registro.registro_sensor);
    labels.push(data_hora_formatada);

    alteracoesAlerta(registro.registro_sensor, horas_minutos)
  }

  // Criando estrutura para plotar gráfico - config
  const config = {
    type: 'line',
    data: dados,
  };

  // Adicionando gráfico criado em div na tela
  let myChart = new Chart(
    document.getElementById(`chart_linha`),
    config
  );
  setTimeout(() => atualizarGrafico(idTransporte, dados, myChart), 2000);
}


// Esta função *atualizarGrafico* atualiza o gráfico que foi renderizado na página,
// buscando a última medida inserida em tabela contendo as capturas, 

//     Se quiser alterar a busca, ajuste as regras de negócio em src/controllers
//     Para ajustar o "select", ajuste o comando sql em src/models
function atualizarGrafico(idTransporte, dados, myChart) {
  fetch(`/medidas/tempo-real/${idTransporte}`, { cache: 'no-store' }).then(function (response) {
    if (response.ok) {
      response.json().then(function (novoRegistro) {
        console.log(`Dados recebidos: ${JSON.stringify(novoRegistro)}`);

        var data_hora = new Date(novoRegistro[0].data_hora);
        var dia = data_hora.getDay();
        var mes = data_hora.getMonth();
        var horas = data_hora.getHours();
        var minutos = data_hora.getMinutes();

        if (dia < 10) {
          dia = "0" + dia;
        }
        if (mes < 10) {
          mes = "0" + mes;
        }
        if (horas < 10) {
          horas = "0" + horas;
        }
        if (minutos < 10) {
          minutos = "0" + minutos;
        }

        var data_hora_formatada = `${dia}/${mes}/${data_hora.getFullYear()} ${horas}:${minutos}`;
        var horas_minutos = `${horas}:${minutos}`;

        if (novoRegistro[0].data_hora == dados.labels[dados.labels.length - 1]) {
          alteracoesAlerta(novoRegistro[0].registro_sensor, horas_minutos)
        } else {
          // tirando e colocando valores no gráfico
          dados.labels.shift(); // apagar o primeiro
          dados.labels.push(data_hora_formatada); // incluir um novo momento

          dados.datasets[0].data.shift();  // apagar o primeiro de umidade
          dados.datasets[0].data.push(novoRegistro[0].registro_sensor); // incluir uma nova medida de umidade



          //ALTERANDO STATUS DA TEMPERATURA
          alteracoesAlerta(novoRegistro[0].registro_sensor, horas_minutos)

          myChart.update();
        }

        // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
        proximaAtualizacao = setTimeout(() => atualizarGrafico(idTransporte, dados, myChart), 2000);
      });
    } else {
      console.error('Nenhum dado encontrado ou erro na API');
      // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
      proximaAtualizacao = setTimeout(() => atualizarGrafico(idTransporte, dados, myChart), 2000);
    }
  })
    .catch(function (error) {
      console.error(`Erro na obtenção dos dados p / gráfico: ${error.message}`);
    });

}

function alteracoesAlerta(temperatura, horas) {
  //ALTERANDO STATUS DA TEMPERATURA
  if (temperatura <= -28.99 || temperatura >= -15.99) {
    tempColor.style.backgroundColor = "#F03C31"
  } else if (temperatura <= -27.99) {
    tempColor.style.backgroundColor = "#F3950C"
  } else if (temperatura <= -25) {
    tempColor.style.backgroundColor = "#F0CC18"
  } else {
    tempColor.style.backgroundColor = "#245953"
  }

  horaTempAviso.innerHTML = `${horas}`;
  tempAviso.innerHTML = `${temperatura}`
}