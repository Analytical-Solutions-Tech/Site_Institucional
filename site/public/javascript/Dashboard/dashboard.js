// GRÁFICOS DA DASHBOARD

// GRÁFICO DE TEMPERATURA
var EMAIL_USUARIO = sessionStorage.getItem('EMAIL_USUARIO');
var NOME_USUARIO = sessionStorage.getItem('NOME_USUARIO');
var ID_USUARIO = sessionStorage.getItem('ID_USUARIO');
var fkEmpresa = sessionStorage.getItem('FK_CLIENTE');

var informacoesUsuario = {
  idUsuario: ID_USUARIO,
  email: EMAIL_USUARIO,
  nome: NOME_USUARIO,
  idEmpresa: fkEmpresa
}

var proximaAtualizacao;

var tempColor = document.getElementById('hora_temp');
var tempAviso = document.getElementById('temp_aviso');
var horaTempAviso = document.getElementById('hora_temp_aviso');

var chartLinha;
var chartKpiLinha;

var cliente_sensor_transporte = {
  fkCliente: informacoesUsuario.idEmpresa,
  idTransporte: [],
  fkSensor: [],
}

setTimeout(function () {
  sensores_por_cliente();
}, 1000)

setTimeout(function () {
  obterDadosGraficos();
}, 2000);


document.getElementById('sensores').addEventListener("change", function () {
  setTimeout(() => {
    console.log(chartLinha);
    console.log(chartKpiLinha);
    chartLinha.destroy();
    chartKpiLinha.destroy();
    obterDadosGraficos();
  }, 2000);
})

function obterDadosGraficos() {
  var optionSelectedTransporte = document.getElementById('sensores').value;

  obterDadosGrafico(optionSelectedTransporte);

  plotarGraficoClassificacoes();
}



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

// Grafico Bateria
const ctx = document.getElementById('ChartBatery');
new Chart(ctx, {
type: 'bar',
data: {
    // No labels precisamos definir o tempo de forma dinâmica (pegar mesma forma que está representado no gráfico dos sensores)
labels: [],
datasets: [{
label: 'Porcentagem da bateria',
backgroundColor : ['green','yellow','orange','red'],
color: 'black',
data: [100 ,90 ,80 ,70 ,60 ,50 ,40 ,30 ,20, 10, 0],
borderWidth: 3,

}]
},
options: {
scales: {
y: {
beginAtZero: true,
color: "black",

},
x:{
ticks:{
color: "black",

}
}
},
plugins:{
legend:{
labels:{
color: "blue"
}
}
}
}
});


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
    var segundos = data_hora.getSeconds()

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
    if (segundos < 10) {
      segundos = "0" + segundos;
    }

    var horas_minutos_segundos = `${horas}:${minutos}.${segundos}`

    var data_hora_formatada = `${dia}/${mes}/${data_hora.getFullYear()} ${horas}:${minutos}.${segundos}`;
    dados.datasets[0].data.push(registro.registro_sensor);
    labels.push(data_hora_formatada);

    alteracoesAlerta(registro.registro_sensor, horas_minutos_segundos)
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

  chartLinha = myChart;

  setTimeout(() => atualizarGrafico(cliente_sensor_transporte, dados, myChart), 2000);
}

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
        var segundos = data_hora.getSeconds();

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
        if (segundos < 10) {
          segundos = "0" + segundos;
        }

        var data_hora_formatada = `${dia}/${mes}/${data_hora.getFullYear()} ${horas}:${minutos}.${segundos}`;
        var horas_minutos_segundos = `${horas}:${minutos}.${segundos}`;

        if (data_hora_formatada == dados.labels[dados.labels.length - 1]) {
          console.log("Sem valor novo!");
        } else {
          // tirando e colocando valores no gráfico
          dados.labels.shift(); // apagar o primeiro
          dados.labels.push(data_hora_formatada); // incluir um novo momento

          dados.datasets[0].data.shift();  // apagar o primeiro de umidade
          dados.datasets[0].data.push(novoRegistro[0].registro_sensor); // incluir uma nova medida de umidade

          //ALTERANDO STATUS DA TEMPERATURA
          alteracoesAlerta(novoRegistro[0].registro_sensor, horas_minutos_segundos)

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

  fetch(`/medidas/cliente/${fkClienteVar}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    },
  }).then(function (response) {

    if (response.ok) {
      response.json().then(function (resposta) {

        for (let i = 0; i < resposta.length; i++) {
          const idTransporte = resposta[i].idTransporte;
          cliente_sensor_transporte.idTransporte.push(idTransporte);

          let newOption = new Option('Identificação do transporte: ' + idTransporte, idTransporte);

          const select = document.querySelector('select');
          select.add(newOption, undefined);

        }

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
      toast: true,
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
      toast: true,
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
  chartKpiLinha = myChart;
  console.log(chartKpiLinha);
}

function atualizarClassificacoes(grafico, graficoDatasets, listaClassificacoes) {

  graficoDatasets.datasets[0].data = listaClassificacoes; // incluir uma nova medida de umidade

  grafico.update();
}