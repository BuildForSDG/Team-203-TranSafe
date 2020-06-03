import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SpeedService } from 'src/app/services/speed.service';
import { Plugins } from '@capacitor/core';
const { LocalNotifications } = Plugins;



@Component({
  selector: 'app-speedometer',
  templateUrl: './speedometer.component.html',
  styleUrls: ['./speedometer.component.scss'],
})
export class SpeedometerComponent implements OnInit {

  @ViewChild('currentSpeed', {static: true}) currentSpeed: ElementRef;

  updateBtnText = 'Track';
  constructor( public speedService: SpeedService) { }

  ngOnInit() {
    this.speedService.initTrackUser();

    this.updateCurrentSpeed();

  }


// Every 30 degree is equivalent to 20km/h
  updateCurrentSpeed() {

      this.currentSpeed.nativeElement.style.transform = 'rotate(' + 340 + 'deg)';



     }


  async startTrackUser() {

    if (this.updateBtnText === 'Track') {
      this.speedService.startTracking();
      this.speedService.initTrackUser();
      this.updateBtnText = 'Stop';

      // send user notification
      const notifs = await LocalNotifications.schedule({
        notifications: [
          {
            title: 'Tracking',
            body: 'Tracking Started at date:' + Date.now(),
            id: 1,
            schedule: { at: new Date(Date.now() ) },
            sound: null,
            attachments: null,
            actionTypeId: '',
            extra: null
          }
        ]
      });


      console.log(notifs);

    } else {
      this.speedService.stopTracking();
      this.updateBtnText = 'Track';
      const notifs = await LocalNotifications.schedule({
        notifications: [
          {
            title: 'Tracking',
            body: 'Tracking Stopped at date:' + Date.now(),
            id: 1,
            schedule: { at: new Date(Date.now() ) },
            sound: null,
            attachments: null,
            actionTypeId: '',
            extra: null
          }
        ]
      });


      console.log(notifs);
    }



    console.log(this.updateBtnText);
  }
}
