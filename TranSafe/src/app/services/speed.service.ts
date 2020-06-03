import { Injectable, ViewChild, ElementRef } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const { App, BackgroundTask, Geolocation } = Plugins;


declare var google;


@Injectable({
  providedIn: 'root'
})
export class SpeedService {



// Map related
@ViewChild('map') mapElement: ElementRef;
map: any;
markers = [];

 // Firebase Data
 locations: Observable<any>;
 locationsCollection: AngularFirestoreCollection<any>;


  isTracking = false;
  watch: string;

  constructor(private afAuth: AngularFireAuth,
              private afs: AngularFirestore) { }

  trackUser() {
    this.afAuth.user.subscribe(user => {


      this.locationsCollection = this.afs.collection(
        `speed/${user.uid}/track`,
        ref => ref.orderBy('timestamp')
      );
    });

     // Make sure we also get the Firebase item ID!
    this.locations = this.locationsCollection
    .snapshotChanges()
    .pipe(map(actions =>
        actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      ));


    // Update Map marker on every change
    this.locations.subscribe(locations => {
        this.updateMap(locations);
      });


  }

startTracking() {
    this.isTracking = true;
    this.watch = Geolocation.watchPosition({}, (position, err) => {
      if (position) {
        this.addNewLocation(
          position.coords.latitude,
          position.coords.longitude,
          position.timestamp
        );
      }
    });
  }


  // Save a new location to Firebase and center the map
addNewLocation(lat, lng, timestamp) {
  this.locationsCollection.add({
    lat,
    lng,
    timestamp
  });


}



// Unsubscribe from the geolocation watch using the initial ID
stopTracking() {
  Geolocation.clearWatch({ id: this.watch }).then(() => {
    this.isTracking = false;
  });
}



// Redraw all markers on the map
updateMap(locations) {
  // Remove all current marker
  this.markers.map(marker => marker.setMap(null));
  this.markers = [];

  // tslint:disable-next-line:prefer-const
  for (let loc of locations) {
     // tslint:disable-next-line:prefer-const
    let latLng = new google.maps.LatLng(loc.lat, loc.lng);

    // tslint:disable-next-line:prefer-const
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: latLng
    });
    this.markers.push(marker);
  }
}



}
