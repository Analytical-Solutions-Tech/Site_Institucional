const grafico_linha = document.getElementById('chart_linha');

new Chart(grafico_linha, {
  type: 'line',
  data: {
    labels: ['12:30:00', '12:35:00', '12:40:00', '12:45:00', '12:50:00', '12:55:00'],
    datasets: [{
      label: 'Sensor LM35 - New Fish',
      data: [-18, -19, -19.55,-17.99, -18, -27.98, -16.21, -17.99, -28.99],
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
