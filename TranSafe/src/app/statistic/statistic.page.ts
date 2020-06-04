import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { SpeedService } from '../services/speed.service';


@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.page.html',
  styleUrls: ['./statistic.page.scss'],
})
export class StatisticPage implements OnInit {
  @ViewChild('barChart') barChart;

  bars: any;
  colorArray: any;

  section = 'day';
  constructor(private speedService: SpeedService) { }


  ionViewDidEnter() {
    const data = [2.5, 3.8, 5, 6.9, 6.9, 7.5, 10, 17];
    const mdata = this.speedService.getStatsData(this.section);
    console.log(mdata);
    this.createBarChart(data);
  }

  createBarChart(dispaydata) {
    this.bars = new Chart(this.barChart.nativeElement, {
      type: 'bar',
      data:   {
        labels: ['S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8'],
        datasets: [{
          label: 'Speed',
          data: dispaydata,
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


  // function to change segment value on segment button clicked to change statistic type
 segmentChanged(event) {
    console.log(event.detail.value);
    this.section = event.detail.value;


    // get data from server and feed to chart depending on display type
    switch (this.section) {
      case 'day': {

      const data = [2.5, 3.8, 5, 6.9, 6.9, 7.5, 10, 17];

      this.createBarChart(data);
      break;
      }
      case 'week': {
        const data = [2.5, 10, 15, 6.9, 9.9, 3.5, 8, 4];

        this.createBarChart(data);
        const mdata = this.speedService.getStatsData(this.section);
        console.log(mdata);
        break;
      }
      case 'month': {
        const data =  [5, 15, 15, 18, 9, 3, 2, 1];
        this.createBarChart(data);
        const mdata = this.speedService.getStatsData(this.section);
        console.log(mdata);
        break;
      }
      default: {
         break;
      }
   }




  }

}
