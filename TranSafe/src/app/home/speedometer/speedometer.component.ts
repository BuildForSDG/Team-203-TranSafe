import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-speedometer',
  templateUrl: './speedometer.component.html',
  styleUrls: ['./speedometer.component.scss'],
})
export class SpeedometerComponent implements OnInit {

  @ViewChild('currentSpeed', {static: true}) currentSpeed: ElementRef;
  @ViewChild('speedLimit', {static: true}) speedLimit: ElementRef;

  constructor() { }

  ngOnInit() {this.updateSpeedLimit(); this.updateCurrentSpeed()}

// Every 30 degree is equivalent to 20km/s
  updateCurrentSpeed() {
    this.currentSpeed.nativeElement.style.transform = 'rotate(' + 0 +'deg)';
  }
//update spped limit
  updateSpeedLimit() {
    this.speedLimit.nativeElement.style.transform = 'rotate(120deg)';
  }

  // when over speeding

}
