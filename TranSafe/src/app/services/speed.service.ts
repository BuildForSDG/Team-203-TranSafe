import { Injectable, ViewChild, ElementRef, NgZone } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const { Geolocation } = Plugins;
import { NativeGeocoder, NativeGeocoderOptions, NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';
import { Platform } from '@ionic/angular';
declare var google;


@Injectable({
  providedIn: 'root'
})
export class SpeedService {



// Map related
@ViewChild('map') mapElement: ElementRef;
map: any;


markers = [];
userCity;
latLngResult;



 // Firebase Data
 locations: Observable<any>;
 locationsCollection: AngularFirestoreCollection<any>;


  isTracking = false;
  watch: string;

  constructor(public zone: NgZone,
              private afAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private nativeGeocoder: NativeGeocoder,
              private platform: Platform) { }

  initTrackUser() {
    this.afAuth.user.subscribe(user => {

      console.log(user.uid);
      this.locationsCollection = this.afs.collection(
        `speed/${user.uid}/track`,
        ref => ref.orderBy('timestamp', 'desc').limit(1)
      );
    });
    console.log('YYYYYYY1');
     // Make sure we also get the Firebase item ID!
    this.locations = this.locationsCollection
    .snapshotChanges()
    .pipe(map(actions =>
        actions.map(a => {
          console.log( a.payload.doc.data());
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      ));




  }

startTracking() {
    this.isTracking = true;
    this.watch = Geolocation.watchPosition({}, (position, err) => {
      if (position) {
        this.addNewLocation(
          position.coords.latitude,
          position.coords.longitude,
          position.timestamp,
          position.coords.speed,
          position.coords.heading
        );
      }
    });
  }

getDataRealTime() {
      // Update Map marker on every change
     return this.locations;
}
  // Save a new location to Firebase and center the map
addNewLocation(lat, lng, timestamp, speed, heading) {
  // get the location type and compare to speed limits

  const speedLimits = {
        city: 30,
        urban: 50,
        highways: 80 || 90,
        motorway: 100
  };

  this.reverseGeocode(lat, lng);

  this.locationsCollection.add({
    lat,
    lng,
    timestamp,
    speed,
    heading
  });


}



// Unsubscribe from the geolocation watch using the initial ID
stopTracking() {
  Geolocation.clearWatch({ id: this.watch }).then(() => {
    this.isTracking = false;
  });
}





loadMap() {
  // tslint:disable-next-line:prefer-const
  let latLng = new google.maps.LatLng(5.550000, -0.020000);

  // tslint:disable-next-line:prefer-const
  let mapOptions = {
    center: latLng,
    zoom: 5,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
}



// reverse geocode to get place type
reverseGeocode(lat, lng) {
  if (this.platform.is('cordova')) {
    const options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5
    };
    this.nativeGeocoder.reverseGeocode(lat, lng, options)
      .then((result: NativeGeocoderResult[]) => {
        console.log(result[0]);

      })
      .catch((error: any) => console.log(error));
  } else {
    this.getGeoLocation(lat, lng, 'reverseGeocode');
  }
}




async getGeoLocation(lat: number, lng: number, type?) {
  if (navigator.geolocation) {
    const geocoder = await new google.maps.Geocoder();
    const latlng = await new google.maps.LatLng(lat, lng);
    const request = { latLng: latlng };

    await geocoder.geocode(request, (results, status) => {
      if (status === google.maps.GeocoderStatus.OK) {
        const result = results[0];
        this.zone.run(() => {
          if (result != null) {
            this.userCity = result.formatted_address;
            console.log(result.formatted_address);
            if (type === 'reverseGeocode') {
              console.log(result.formatted_address);
              this.latLngResult = result.formatted_address;
            }
          }
        });
      }
    });
  }
}




}
