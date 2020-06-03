import {  Component, OnInit, ViewChild  } from '@angular/core';
import { SpeedService } from '../services/speed.service';
import { GoogleMap, MapInfoWindow } from '@angular/google-maps';




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

    console.log('HHHHHHHH');

    // this.speedService.loadMap();
    if (this.speedService.isTracking) {

    console.log('HHHHHHHH');
    // this.speedService.initTrackUser();

    // Update Map marker on every change
    this.speedService.getDataRealTime().subscribe(locations => {
          console.log(locations);
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
    this.markers.push({
      position: latLng,
      label: {
        color: 'red',
        text: 'Marker label ' + (this.markers.length + 1),
      },
      title: 'Marker title ' + (this.markers.length + 1),
      options: { animation: google.maps.Animation.BOUNCE },
    });
  }
}



  logCenter() {
    console.log(JSON.stringify(this.map.getCenter()));
  }



mapclick(event: google.maps.MouseEvent) {
  console.log(event);
}

}
