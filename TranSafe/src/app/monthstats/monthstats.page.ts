import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';


@Component({
  selector: 'app-monthstats',
  templateUrl: './monthstats.page.html',
  styleUrls: ['./monthstats.page.scss'],
})
export class MonthstatsPage implements OnInit {
  @ViewChild('barChart') barChart;

  bars: any;
  colorArray: any;
  constructor() { }

  ionViewDidEnter() {
    this.createBarChart();
  }

  createBarChart() {
    this.bars = new Chart(this.barChart.nativeElement, {
      type: 'bar',
      data: {
        labels: ['S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8'],
        datasets: [{
          label: 'Speed',
          data: [2.5, 3.8, 5, 6.9, 6.9, 7.5, 10, 17],
          backgroundColor: '#5F4591', // array should have same number of elements as number of dataset
          borderColor: '#5F4591', // array should have same number of elements as number of dataset
          borderWidth: 0.1
        }]
      },
      options: {
        scales: {
          xAxes: [{
            barPercentage: 0.3,
            gridLines: {
                 display: false
            }
         }],
          yAxes: [{
            ticks: {
              beginAtZero: false
            },
            gridLines: {
              display: false
         }
          }]
        }
      }
    });
  }


  ngOnInit() {
  }

}
