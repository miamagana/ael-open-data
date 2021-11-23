import { Component, Input, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit {
  @Input() data: any;
  @Input() label!: string;
  @Input() type!: any;
  Highcharts: typeof Highcharts = Highcharts;
  updateFlag: boolean = false;
  chartOptions: Highcharts.Options = {};

  constructor() {
    Highcharts.setOptions({
      colors: ['#59A700'],
      chart: {
        backgroundColor: {
          linearGradient: { x1: 0, x2: 0, y1: 0, y2: 400 },
          stops: [
            [0, 'rgb(96, 96, 96)'],
            [1, 'rgb(16, 16, 16)'],
          ],
        },
        borderWidth: 0,
        borderRadius: 15,
        plotShadow: false,
        plotBorderWidth: 0,
      },
      title: {
        style: {
          color: '#59A700',
          font: '16px Lucida Grande, Lucida Sans Unicode, Verdana, Arial, Helvetica, sans-serif',
        },
      },
      subtitle: {
        style: {
          color: '#DDD',
          font: '12px Lucida Grande, Lucida Sans Unicode, Verdana, Arial, Helvetica, sans-serif',
        },
      },
      xAxis: {
        gridLineWidth: 0,
        lineColor: '#59A700',
        tickColor: '#59A700',
        labels: {
          style: {
            color: '#59A700',
            fontWeight: 'bold',
          },
        },
        title: {
          style: {
            color: '#AAA',
            font: 'bold 12px Lucida Grande, Lucida Sans Unicode, Verdana, Arial, Helvetica, sans-serif',
          },
        },
      },
      yAxis: {
        gridLineColor: 'rgba(255, 255, 255, .1)',
        lineWidth: 0,
        tickWidth: 0,
        labels: {
          style: {
            color: '#59A700',
            fontWeight: 'bold',
          },
        },
        title: {
          style: {
            color: '#59A700',
            font: 'bold 12px Lucida Grande, Lucida Sans Unicode, Verdana, Arial, Helvetica, sans-serif',
          },
        },
      },
      legend: {
        itemStyle: {
          color: '#59A700',
        },
        itemHoverStyle: {
          color: '#59A700',
        },
        itemHiddenStyle: {
          color: '#FFF',
        },
      },
      credits: {
        enabled: false,
      },
      tooltip: {
        backgroundColor: {
          linearGradient: { x1: 0, x2: 0, y1: 0, y2: 50 },
          stops: [
            [0, 'rgba(96, 96, 96, .8)'],
            [1, 'rgba(16, 16, 16, .8)'],
          ],
        },
        borderWidth: 0,
        style: {
          color: '#FFF',
        },
      },
      responsive: {
        rules: [
          {
            condition: {
              maxWidth: 500,
            },
            chartOptions: {
              legend: {
                layout: 'horizontal',
                align: 'center',
                verticalAlign: 'bottom',
              },
            },
          },
        ],
      },
      plotOptions: {
        series: {
          states: {
            hover: {
              enabled: false,
            },
          },
        },
        line: {
          dataLabels: {
            color: '#59A700',
          },
          marker: {
            lineColor: '#59A700',
          },
        },
        spline: {
          marker: {
            lineColor: '#59A700',
          },
        },

        scatter: {
          marker: {
            lineColor: '#59A700',
          },
        },
      },
    });
  }

  ngOnInit(): void {
    this.chartOptions = {
      title: { text: this.label, align: 'center' },
      tooltip: { enabled: false },
      series: [
        {
          data: this.data,
          type: this.type,
          name: this.label,
        },
      ],
      xAxis: {
        type: 'datetime',
      },
    };
    this.updateFlag = true;
  }
}
