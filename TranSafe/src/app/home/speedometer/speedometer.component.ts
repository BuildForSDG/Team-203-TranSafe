import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SpeedService } from 'src/app/services/speed.service';
import { Plugins } from '@capacitor/core';
import { AlertController } from '@ionic/angular';
import { async } from '@angular/core/testing';
const {  Toast  } = Plugins;

export interface SpeedData {
    convSpeed: number;
    heading?: number;
    id: string;
    lat: number;
    lng: number;
    overSpeed: boolean;
    speedLimit: number;
    timestamp: string;
    isdriving: boolean;

}


@Component({
  selector: 'app-speedometer',
  templateUrl: './speedometer.component.html',
  styleUrls: ['./speedometer.component.scss'],
})
export class SpeedometerComponent implements OnInit {

  @ViewChild('currentSpeed', {static: true}) currentSpeed: ElementRef;
  isDriving;
  updateBtnText = 'Track';
  isBeginTrack = false;
  speedlmt = 60;
  constructor( public speedService: SpeedService,
               public alertController: AlertController) { }

  ngOnInit() {
    this.speedService.initTrackUser();

  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Start Tracking',
      message: '<ion-grid>\
                <ion-row><ion-col><ion-text>You are about to <strong>initiate tracking</strong></ion-text>\
                <ion-text>. Are You Driving <ion-icon name="car-sharp"></ion-icon>\
                 or Boarding <ion-icon name="man-sharp"></ion-icon>? Choose your option below</ion-text></ion-col></ion-row>\
                 </ion-grid> ',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            this.isBeginTrack = false;
            this.updateBtnText = 'Track';
          }
        },
        {
          text: 'Boarding, Begin Tracking',
          handler: (blah) => {
            this.isBeginTrack = true;
            this.boardingTrack('boarding');
            this.updateBtnText = 'Stop';
            this.updateCurrentSpeed();
          }
        }
        , {
          text: 'Driving, Begin Tracking',
          handler: () => {
            this.isBeginTrack = true;
            this.drivingTrack('driving');
            this.updateBtnText = 'Stop';
            this.updateCurrentSpeed();
          }
        }
      ]
    });

    await alert.present();
  }

  segmentChanged(event) {

    this.isDriving = event.detail.value;
    console.log(this.isDriving);
  }


// Every 30 degree is equivalent to 20km/h
  updateCurrentSpeed() {

    this.speedService.getDataRealTime().subscribe(locationsData => {
      const data = locationsData[0] as SpeedData;

      if ( data.convSpeed !== null) {
        const radian = data.convSpeed;
        this.speedlmt = data.speedLimit;
        this.currentSpeed.nativeElement.style.transform = `rotate(${radian + 180}deg)`;
      }

    });

  }


async boardingTrack(status) {
  const isdrive = (status === 'driving') ? true : false;
  this.speedService.startTracking(isdrive);
  this.speedService.initTrackUser();
  // send user notification

  this.showToast('Tracking has began with Boarding option');
}

async drivingTrack(status) {
  const isdrive = (status === 'driving') ? true : false;
  this.speedService.startTracking(isdrive);
  this.speedService.initTrackUser();
  // send user notification

  this.showToast('Tracking has began with Driving option');
}


  async startTrackUser() {

    if (this.updateBtnText === 'Track') {
      this.presentAlertConfirm();
    } else {
      if ( this.speedService.isTracking) {
        this.speedService.stopTracking();
      }
      this.updateBtnText = 'Track';

      this.showToast('Tracking Stopped');

    }

  }


  async showToast(message) {

    await Toast.show({
      text: message
    });
  }


}


