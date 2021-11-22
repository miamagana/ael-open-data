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
  constructor() {}

  ngOnInit(): void {
    this.chartOptions = {
      title: { text: this.label, align: 'center' },

      series: [
        {
          data: this.data,
          type: this.type,
        },
      ],
      xAxis: {
        type: 'datetime',
      },
    };
    this.updateFlag = true;
  }
}
