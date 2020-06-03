import {  Component, OnInit, ViewChild  } from '@angular/core';
import { SpeedService } from '../services/speed.service';
import { GoogleMap } from '@angular/google-maps';



@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit {



  zoom = 12;
  center: google.maps.LatLngLiteral;
  options: google.maps.MapOptions = {
    mapTypeId: 'hybrid',
    zoomControl: false,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    maxZoom: 15,
    minZoom: 8,
  };


  constructor(private speedService: SpeedService) {

  }





  ngOnInit() {
    // tslint:disable-next-line:prefer-const
    let latLng = new google.maps.LatLng(5.550000, -0.020000);

    // this.speedService.loadMap();
    if (this.speedService.isTracking) {

      this.center = {
        lat: 5.550000,
        lng: -0.020000};
    // this.speedService.initTrackUser();

    }

  }




}
