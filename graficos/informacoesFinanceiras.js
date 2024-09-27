const apiKey = 'SUA_CHAVE_API'; // Substitua por sua chave da Alpha Vantage
const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=MSFT&apikey=${apiKey}`;

async function vizualizarInformacoesFinanceiras() {
    const res = await fetch(url);
    const dados = await res.json();
    const series = dados['Time Series (Daily)'];

    // Extraindo dados de preços
    const datas = Object.keys(series).slice(0, 10); // Os últimos 10 dias
    const precos = datas.map(data => parseFloat(series[data]['4. close']));

    // Criar gráfico
    const data = [
        {
            x: datas.reverse(), // Inverter para exibir de forma cronológica
            y: precos.reverse(),
            type: 'line',
            marker: {
                color: getCSS('--secondary-color')
            }
        }
    ];

    const laytout = {
        plot_bgcolor: getCSS('--bg-color'),
        paper_bgcolor: getCSS('--bg-color'),
        title: {
            text: 'Preço das Ações da Microsoft nos Últimos 10 Dias',
            x: 0,
            font: {
                color: getCSS('--primary-color'),
                size: 30,
                font: getCSS('--font')
            }
        },
        xaxis: {
            tickfont: tickConfig,
            title: {
                text: 'Datas',
                font: {
                    color: getCSS('--secondary-color')
                }
            }
        },
        yaxis: {
            tickfont: tickConfig,
            title: {
                text: 'Preço em USD',
                font: {
                    color: getCSS('--secondary-color')
                }
            }
        }
    };

    const grafico = document.createElement('div');
    grafico.className = 'grafico';
    document.getElementById('graficos-container').appendChild(grafico);
    Plotly.newPlot(grafico, data, laytout);
}

vizualizarInformacoesFinanceiras();
