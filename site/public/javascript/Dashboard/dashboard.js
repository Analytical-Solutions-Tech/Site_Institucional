const grafico_linha = document.getElementById('chart_linha');

new Chart(grafico_linha, {
  type: 'line',
  data: {
    labels: ['5', '10', '15', '20', '25', '30'],
    datasets: [{
      label: 'Temperaturas Atuais',
      data: [-15, -10, -11, -5, -6, -10, -14, , -15, -13],
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
        text: 'Atualização a cada 5 minutos',
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
      label: 'Abaixo do limite',
      data: [5],
      borderWidth: 5,
      backgroundColor: [
        'rgba(54, 162, 235)',
      ],
      borderColor: [
        'rgba(54, 162, 235)',
      ],
    },
    {
      label: 'No Limite',
      data: [5],
      borderWidth: 5,
      backgroundColor: [
        '#ffa500',
      ],
      borderColor: [
        '#ffa500',
      ],
    },
    {
      label: 'Acima do Limite',
      data: [5],
      borderWidth: 5,
      backgroundColor: [
        '#F2978B',
      ],
      borderColor: [
        '#F2978B',
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
