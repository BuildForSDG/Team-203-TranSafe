import { Component, OnInit } from '@angular/core';
import { SpeedService } from '../services/speed.service';

export interface NotifData {
  Message: string;
  Speed: number;
  Timestamp: string;
  VhcNumber: string;
}


@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {

  constructor(private speedService: SpeedService) { }

  setData: NotifData;
  ngOnInit() {

  }

  ionViewDidEnter() {

    this.speedService
    .getNotifications()
    .subscribe( data => {

      const getData = data as NotifData;


      this.setData = getData;

    });
  }

}
