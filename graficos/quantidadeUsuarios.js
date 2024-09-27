import { getCSS, tickConfig } from "./common.js";

async function quantidadeUsuariosPorRede() {
    const stocks = ['AAPL', 'GOOGL', 'AMZN', 'MSFT', 'TSLA']; // Exemplos de ações
    const promises = stocks.map(symbol => {
        const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=SUA_CHAVE_API`;
        return fetch(url).then(res => res.json());
    });

    const results = await Promise.all(promises);

    // Extrair os dados de preços
    const datas = results.map(result => {
        const series = result['Time Series (Daily)'];
        return Object.keys(series).slice(0, 1).map(data => parseFloat(series[data]['4. close']));
    });

    const data = [
        {
            x: stocks,
            y: datas.map(priceArray => priceArray[0]), // Último preço
            type: 'bar',
            marker: {
                color: getCSS('--primary-color')
            }
        }
    ];

    const laytout = {
        plot_bgcolor: getCSS('--bg-color'),
        paper_bgcolor: getCSS('--bg-color'),
        title: {
            text: 'Últimos Preços das Ações Selecionadas',
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
                text: 'Ações',
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

quantidadeUsuariosPorRede();
