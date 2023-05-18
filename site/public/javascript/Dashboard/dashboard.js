// GRÁFICOS DA DASHBOARD

// GRÁFICO DE TEMPERATURA

var grafico_temperatura = new Chart(grafico_linha, {
  type: 'line',
  data: {
    labels: ['12:30:00', '12:35:00', '12:40:00', '12:45:00', '12:50:00', '12:55:00'],
    datasets: [{
      label: 'Sensor LM35 - New Fish',
      data: [],
      borderWidth: 5
    },
    ]
  }, 
  options: {
    plugins: {
      legend: {
        labels: {
          font: {
            size: 19,
            family: "'Poppins', sans-serif"
          }
        }
      },
      title: {
        display: true,
        text: 'Horário',
        position: 'bottom',
        font: {
          size: 20,
          family: "'Poppins', sans-serif"
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});

const kpi_linha = document.getElementById('kpi_linha');

new Chart(kpi_linha, {
  type: 'bar',
  data: {
    labels: [''],
    datasets: [{
      label: 'Ideal',
      data: [3],
      borderWidth: 5,
      backgroundColor: [
        '#3DA673',
      ],
      borderColor: [
        '#3DA673',
      ],
    },
    {
      label: 'Incorreta',
      data: [2],
      borderWidth: 5,
      backgroundColor: [
        '#F0CC18',
      ],
      borderColor: [
        '#F0CC18',
      ],
    },
    {
      label: 'Preocupante',
      data: [2],
      borderWidth: 5,
      backgroundColor: [
        '#F3950C',
      ],
      borderColor: [
        '#F3950C',
      ],
    },
    {
      label: 'Crítica',
      data: [1],
      borderWidth: 5,
      backgroundColor: [
        '#F03C31',
      ],
      borderColor: [
        '#F03C31',
      ],
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});

const kpi_lucros = document.getElementById('kpi_donnut');

new Chart(kpi_lucros, {
  type: 'line',
  data: {
    labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
    datasets: [{
      label: 'Lucros com a Healthy Fish (R$)',

      data: [10000, 20090, 31000, 35000, 39800, 41000, 59600, 80000, 100000],
      borderWidth: 3
    },
    {
      label: 'Prejuízos ao ano (R$)',
      data: [10000, 9700, 5200, 5000, 4300, 4040, 3970, 3200, 200],
      borderWidth: 3
    }]
  },
  options: {
    plugins: {
      legend: {
        labels: {
          font: {
            size: 19,
            family: "'Poppins', sans-serif"
          }
        }
      },
      title: {
        display: true,
        text: 'Meses',
        position: 'bottom',
        font: {
          size: 18,
          family: "'Poppins', sans-serif"
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});




// PEGAR DADOS DO BANCO DE DADOS


const grafico_linha = document.getElementById('chart_linha');

let proximaAtualizacao;

window.onload = obterDadosGraficos();

function obterDadosGraficos() {
    obterDadosGrafico(1)
    obterDadosGrafico(2)
    obterDadosGrafico(3)
    obterDadosGrafico(4)
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

    fetch(`/medidas/ultimas/${idTransporte}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
          console.log(JSON.stringify(resposta))
            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                resposta.reverse();

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

    console.log('iniciando plotagem do gráfico...');

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

    console.log('----------------------------------------------')
    console.log('Estes dados foram recebidos pela funcao "obterDadosGrafico" e passados para "plotarGrafico":')
    console.log(resposta)

    // Inserindo valores recebidos em estrutura para plotar o gráfico
    for (i = 0; i < resposta.length; i++) {
        var registro = resposta[i];
        grafico_temperatura.data.datasets.data[0].push(registro.temperatura);
    }

    console.log('----------------------------------------------')
    console.log('O gráfico será plotado com os respectivos valores:')
    console.log('Labels:')
    console.log(labels)
    console.log('Dados:')
    console.log(dados.datasets)
    console.log('----------------------------------------------')

    // Criando estrutura para plotar gráfico - config
    const config = {
        type: 'line',
        data: dados,
    };

    // Adicionando gráfico criado em div na tela

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
                console.log(`Dados atuais do gráfico:`);
                console.log(dados);

                let avisoCaptura = document.getElementById(`avisoCaptura${idTransporte}`)
                avisoCaptura.innerHTML = ""


                if (novoRegistro[0].momento_grafico == dados.labels[dados.labels.length - 1]) {
                    console.log("---------------------------------------------------------------")
                    console.log("Como não há dados novos para captura, o gráfico não atualizará.")
                    avisoCaptura.innerHTML = "<i class='fa-solid fa-triangle-exclamation'></i> Foi trazido o dado mais atual capturado pelo sensor. <br> Como não há dados novos a exibir, o gráfico não atualizará."
                    console.log("Horário do novo dado capturado:")
                    console.log(novoRegistro[0].momento_grafico)
                    console.log("Horário do último dado capturado:")
                    console.log(dados.labels[dados.labels.length - 1])
                    console.log("---------------------------------------------------------------")
                } else {
                    // tirando e colocando valores no gráfico
                    dados.labels.shift(); // apagar o primeiro
                    dados.labels.push(novoRegistro[0].momento_grafico); // incluir um novo momento

                    dados.datasets[0].data.shift();  // apagar o primeiro de umidade
                    dados.datasets[0].data.push(novoRegistro[0].umidade); // incluir uma nova medida de umidade

                    dados.datasets[1].data.shift();  // apagar o primeiro de temperatura
                    dados.datasets[1].data.push(novoRegistro[0].temperatura); // incluir uma nova medida de temperatura

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
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });

}




