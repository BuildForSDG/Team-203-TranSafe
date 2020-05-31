import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-speedometer',
  templateUrl: './speedometer.component.html',
  styleUrls: ['./speedometer.component.scss'],
})
export class SpeedometerComponent implements OnInit {

  @ViewChild('currentSpeed', {static: true}) currentSpeed: ElementRef;


  constructor() { }

  ngOnInit() { this.updateCurrentSpeed(); }


// Every 30 degree is equivalent to 20km/h
  updateCurrentSpeed() {

    this.currentSpeed.nativeElement.style.transform = 'rotate(' + 340 + 'deg)';
  }


  // when over speeding

}
