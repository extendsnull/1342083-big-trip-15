import Abstract from './abstract';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { ChartType } from '../const';
import { humanizeDuration } from '../utils/date';

const CHART_MIN_HEIGHT = 180;
const BAR_HEIGHT = 55;

const getChartSettings = (title, sortedPoints, formatter) => {
  const labels = Object.keys(sortedPoints).map((type) => type.toUpperCase());
  const data = Object.values(sortedPoints);

  return {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels,
      datasets: [{
        data,
        backgroundColor: '#ffffff',
        hoverBackgroundColor: '#ffffff',
        anchor: 'start',
      }],
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13,
          },
          color: '#000000',
          anchor: 'end',
          align: 'start',
          formatter,
        },
      },
      title: {
        display: true,
        text: title,
        fontColor: '#000000',
        fontSize: 23,
        position: 'left',
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: '#000000',
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          barThickness: 44,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          minBarLength: 100,
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  };
};

const getStatsTemplate = () => (`
  <section class="statistics">
    <h2 class="visually-hidden">Trip statistics</h2>
    <div class="statistics__item">
      <canvas class="statistics__chart" id="money" width="900"></canvas>
    </div>
    <div class="statistics__item">
      <canvas class="statistics__chart" id="type" width="900"></canvas>
    </div>
    <div class="statistics__item">
      <canvas class="statistics__chart" id="time-spend" width="900"></canvas>
    </div>
  </section>`);

export default class Stats extends Abstract {
  constructor(poits) {
    super();
    this._sortedPoints = poits;
    this._init();
  }

  _getTemplate() {
    return getStatsTemplate();
  }

  _init() {
    this._setCharts();
  }

  _setCharts() {
    const moneyCtx = this.getElement().querySelector('#money');
    const typeCtx = this.getElement().querySelector('#type');
    const timeSpendCtx = this.getElement().querySelector('#time-spend');

    moneyCtx.height = Math.max(BAR_HEIGHT * Object.keys(this._sortedPoints.money).length, CHART_MIN_HEIGHT);
    typeCtx.height = Math.max(BAR_HEIGHT * Object.keys(this._sortedPoints.type).length, CHART_MIN_HEIGHT);
    timeSpendCtx.height = Math.max(BAR_HEIGHT * Object.keys(this._sortedPoints.timeSpend).length, CHART_MIN_HEIGHT);

    new Chart(moneyCtx, getChartSettings(
      ChartType.MONEY,
      this._sortedPoints.money,
      (val) => `€ ${val}`,
    ));

    new Chart(typeCtx, getChartSettings(
      ChartType.TYPE,
      this._sortedPoints.type,
      (val) => `${val}x`,
    ));

    new Chart(timeSpendCtx, getChartSettings(
      ChartType.TIME_SPEND,
      this._sortedPoints.timeSpend,
      (val) => humanizeDuration(val),
    ));
  }
}
