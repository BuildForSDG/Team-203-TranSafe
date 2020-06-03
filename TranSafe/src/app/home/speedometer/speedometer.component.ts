import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SpeedService } from 'src/app/services/speed.service';

@Component({
  selector: 'app-speedometer',
  templateUrl: './speedometer.component.html',
  styleUrls: ['./speedometer.component.scss'],
})
export class SpeedometerComponent implements OnInit {

  @ViewChild('currentSpeed', {static: true}) currentSpeed: ElementRef;

  updateBtnText = 'Track';
  constructor( private speedService: SpeedService) { }

  ngOnInit() {
    this.speedService.initTrackUser();

    this.updateCurrentSpeed();

  }


// Every 30 degree is equivalent to 20km/h
  updateCurrentSpeed() {

      this.currentSpeed.nativeElement.style.transform = 'rotate(' + 340 + 'deg)';



     }


  startTrackUser() {

    if (this.updateBtnText === 'Track') {
      this.speedService.startTracking();
      this.updateBtnText = 'Stop';
    } else {
      this.speedService.stopTracking();
      this.updateBtnText = 'Track';
    }



    console.log(this.updateBtnText);
  }
}
