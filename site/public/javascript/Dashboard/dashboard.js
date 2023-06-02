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

//PUXAR NO LOGIN, FKCLIENTE = FKEMPRESA
//PUXAR DE UM INPUT DO FRONT-END DA DASHBOARD
//AINDA NÃO DEFINIDO
var cliente_sensor_transporte = {
  fkCliente: sessionStorage.getItem('FK_CLIENTE'),
  fkSensor: 1,
  idTransporte: 4,
}

setTimeout(sensores_por_cliente(), 100)
window.onload = obterDadosGraficos();

function obterDadosGraficos() {
  obterDadosGrafico(cliente_sensor_transporte);
  plotarGraficoClassificacoes();
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
function obterDadosGrafico(cliente_sensor_transporte) {
  
  if (proximaAtualizacao != undefined) {
    clearTimeout(proximaAtualizacao);
  }

  fetch(`/medidas/ultimas/${cliente_sensor_transporte}`).then(function (response) {
    
    if (response.ok) {
      response.json().then(function (resposta) {
        console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
        resposta.reverse();

        

        plotarGrafico(resposta, cliente_sensor_transporte);
      });
    } else {
      console.error('Nenhum dado encontrado ou erro na API');
    }
  })
    .catch(function (error) {
      console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });
}

function buscar_transporte_e_sensores(fkCliente) {

    console.log("id_cliente: ", fkCliente);

    fetch(`/medidas/buscar_transporte_e_sensores/${fkCliente}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(function (resposta) {
        console.log("ESTOU NO THEN DO entrar()!", resposta)

        if (resposta.ok) {
            resposta.json().then(json => {
                console.log(JSON.stringify(json));

                sessionStorage.clear()

                sessionStorage.EMAIL_USUAIRO = json.Email;
                sessionStorage.NOME_USUARIO = json.Nome;
                sessionStorage.ID_USUARIO = json.idUsuario;
                sessionStorage.FK_CLIENTE = json.fkEmpresas;

                setTimeout(function () {
                    window.location = "./dashboard.html";
                }, 1000); // apenas para exibir o loading
            });
        } else {
            modal_container.style.display = "flex";
            modal_titulo.innerHTML = "Erro ao fazer login"
            modal_txt.innerHTML = "Verfifique se o email e a senha estão corretos e tente novamente"

            resposta.text().then(texto => {
                console.error(texto);
            });
        }

    }).catch(function (erro) {
        console.log(erro);
    })

    return false;
}

// Esta função *plotarGrafico* usa os dados capturados na função anterior para criar o gráfico
// Configura o gráfico (cores, tipo, etc), materializa-o na página e, 
// A função *plotarGrafico* também invoca a função *atualizarGrafico*
function plotarGrafico(resposta, cliente_sensor_transporte) {

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
  for (i = 0; i < resposta.length; i++) {
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
  setTimeout(() => atualizarGrafico(cliente_sensor_transporte, dados, myChart), 2000);
}


// Esta função *atualizarGrafico* atualiza o gráfico que foi renderizado na página,
// buscando a última medida inserida em tabela contendo as capturas, 

//     Se quiser alterar a busca, ajuste as regras de negócio em src/controllers
//     Para ajustar o "select", ajuste o comando sql em src/models
function atualizarGrafico(cliente_sensor_transporte, dados, myChart) {
  fetch(`/medidas/tempo-real/${cliente_sensor_transporte}`, { cache: 'no-store' }).then(function (response) {
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
        proximaAtualizacao = setTimeout(() => atualizarGrafico(cliente_sensor_transporte, dados, myChart), 2000);
      });
    } else {
      console.error('Nenhum dado encontrado ou erro na API');
      // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
      proximaAtualizacao = setTimeout(() => atualizarGrafico(cliente_sensor_transporte, dados, myChart), 2000);
    }
  })
    .catch(function (error) {
      console.error(`Erro na obtenção dos dados p / gráfico: ${error.message}`);
    });

}

function sensores_por_cliente() {

  var fkClienteVar = cliente_sensor_transporte.fkCliente;

  console.log("fk_Cliente: ", cliente_sensor_transporte.fkCliente);

  fetch(`/medidas/cliente/${fkClienteVar}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    },
  }).then(function (response) {

    if (response.ok) {
      response.json().then(function (resposta) {
        console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
        resposta.reverse();
      })
    }
  }).catch(function (erro) {
    console.log(erro);
  })
}

var qtdTempIdeal = 0;
var qtdTempIncorreta = 0;
var qtdTempPreocupante = 0;
var qtdTempCritica = 0;

function alteracoesAlerta(temperatura, horas) {
  //ALTERANDO STATUS DA TEMPERATURA
  if (temperatura <= -28.99 || temperatura >= -15.99) {
    tempColor.style.backgroundColor = "#F03C31";
    qtdTempCritica++;
    Swal.fire({
      position: 'top-end',
      icon: 'warning',
      title: 'Cuidado! Temperatura Crítica.',
      background: '#F03C31',
      color: '#faebd7',
      showConfirmButton: false,
      timer: 2000
    });
  } else if (temperatura <= -27.99) {
    tempColor.style.backgroundColor = "#F3950C";
    qtdTempPreocupante++;
    Swal.fire({
      position: 'top-end',
      icon: 'warning',
      title: 'Cuidado! Temperatura Preocupante',
      background: '#F3950C',
      color: '#faebd7',
      showConfirmButton: false,
      timer: 2000
    });
  } else if (temperatura <= -25) {
    tempColor.style.backgroundColor = "#F0CC18";
    qtdTempIncorreta++;
  } else {
    tempColor.style.backgroundColor = "#245953";
    qtdTempIdeal++;
  }

  horaTempAviso.innerHTML = `${horas}`;
  tempAviso.innerHTML = `${temperatura}`
}


function plotarGraficoClassificacoes() {

  // Criando estrutura para plotar gráfico - labels
  let labels = ['IDEAL', 'INCORRETA', 'PREOCUPANTE', 'CRÍTICA'];

  let dados = {
    labels: labels,
    datasets: [
      {
        label: 'Quantidade de Temperaturas',
        data: [],
        backgroundColor: [
          '#245953',
          '#F0CC18',
          '#F3950C',
          '#F03C31',
        ],
        hoverOffset: 10
      }]
  };
  // Criando estrutura para plotar gráfico - config
  const config = {
    type: 'pie',
    data: dados,
  };

  // Adicionando gráfico criado em div na tela
  let myChart = new Chart(
    document.getElementById(`kpi_linha`),
    config
  );
  setInterval(() => atualizarClassificacoes(myChart, dados, [qtdTempIdeal, qtdTempIncorreta, qtdTempPreocupante, qtdTempCritica]), 2000);
}

function atualizarClassificacoes(grafico, graficoDatasets, listaClassificacoes) {

  graficoDatasets.datasets[0].data = listaClassificacoes; // incluir uma nova medida de umidade

  grafico.update();
}