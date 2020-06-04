import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { SpeedService } from '../services/speed.service';
import { SpeedData } from '../home/speedometer/speedometer.component';


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
    const speedData = [];
    const timeStamp = [];
    const mdata = this.speedService.getStatsData(this.section).subscribe(getdata => {
      const tomap = getdata as Array<SpeedData>;

      tomap.map( md => {
        speedData.push(md.convSpeed);

        const dtval = new Date(md.timestamp).toLocaleTimeString();

        timeStamp.push(dtval);

      } );
      this.createBarChart(speedData, timeStamp);
    }) ;

  }

  createBarChart(dispaydata, label) {
    console.log(dispaydata, label);
    this.bars = new Chart(this.barChart.nativeElement, {
      type: 'bar',
      data:   {
        labels: [label],
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
            },
            pointLabels: { fontSize: 10 }
         }],
          yAxes: [{
            ticks: {
              beginAtZero: true
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
    this.speedService.initTrackUser();

  }


  // function to change segment value on segment button clicked to change statistic type
 segmentChanged(event) {

    this.section = event.detail.value;


    // get data from server and feed to chart depending on display type
    switch (this.section) {
      case 'day': {

      const data = [2.5, 3.8, 5, 6.9, 6.9, 7.5, 10, 17];
      const speedData = [];
      const timeStamp = [];
      const mdata = this.speedService.getStatsData(this.section).subscribe(getdata => {
        const tomap = getdata as Array<SpeedData>;

        tomap.map( md => {
          speedData.push(md.convSpeed);

          const dtval = new Date(md.timestamp).toLocaleTimeString();

          timeStamp.push(dtval);

        } );
        this.createBarChart(speedData, timeStamp);
      }) ;
      break;
      }
      case 'week': {
        const data = [2.5, 10, 15, 6.9, 9.9, 3.5, 8, 4];
        const speedData = [];
        const timeStamp = [];
        const mdata = this.speedService.getStatsData(this.section).subscribe(getdata => {
          const tomap = getdata as Array<SpeedData>;

          tomap.map( md => {
            speedData.push(md.convSpeed);

            const dtval = new Date(md.timestamp).getDay();

            timeStamp.push(dtval);

          } );
          this.createBarChart(speedData, timeStamp);
        }) ;

        break;
      }
      case 'month': {
        const data =  [5, 15, 15, 18, 9, 3, 2, 1];
        const speedData = [];
        const timeStamp = [];
        const mdata = this.speedService.getStatsData(this.section).subscribe(getdata => {
          const tomap = getdata as Array<SpeedData>;

          tomap.map( md => {
            speedData.push(md.convSpeed);

            const dtval = new Date(md.timestamp).getMonth();

            timeStamp.push(dtval);

          } );
          this.createBarChart(speedData, timeStamp);
        }) ;
        break;
      }
      default: {
         break;
      }
   }




  }

}
