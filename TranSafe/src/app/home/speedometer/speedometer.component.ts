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

// Every 30 degree is equivalent to 20km/h
  updateCurrentSpeed() {
    this.currentSpeed.nativeElement.style.transform = 'rotate(' + 120 +'deg)';
  }
//update spped limit
  updateSpeedLimit() {
    this.speedLimit.nativeElement.style.transform = 'rotate(80deg)';
  }

  // when over speeding

}
