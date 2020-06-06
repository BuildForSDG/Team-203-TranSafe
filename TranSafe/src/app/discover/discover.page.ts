import {  Component, OnInit, ViewChild  } from '@angular/core';
import { SpeedService } from '../services/speed.service';
import { GoogleMap, MapInfoWindow } from '@angular/google-maps';
import { SpeedData } from '../home/speedometer/speedometer.component';




@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit {
  map: google.maps.Map;
  markers = [];
  @ViewChild(MapInfoWindow, { static: false }) info: MapInfoWindow;


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


  ionViewWillEnter() {

    // this.speedService.loadMap();
    if (this.speedService.isTracking) {


    // this.speedService.initTrackUser();

    // Update Map marker on every change
    this.speedService.getDataRealTime().subscribe(locations => {

          this.updateMap(locations);
        });

    }

  }



  ngOnInit() {
  }



// Redraw all markers on the map
updateMap(locations) {
  // Remove all current marker
  this.markers = [];

  // tslint:disable-next-line:prefer-const
  for (let loc of locations) {
     // tslint:disable-next-line:prefer-const
    let latLng = new google.maps.LatLng(loc.lat, loc.lng);
    this.center = {
      lat: loc.lat,
      lng: loc.lng,
    };
    const data = locations as SpeedData;
    const isdrive = (data.isdriving) ? 'Driving' : 'Boadring';
    this.markers.push({
      position: latLng,
      options: { icon: (isdrive === 'Driving') ? '../assets/map/car_2.png' : '../assets/map/user.png'},
    });




  }
}



  logCenter() {
    console.log(JSON.stringify(this.map.getCenter()));
  }



mapclick(event: google.maps.MouseEvent) {

}

}
