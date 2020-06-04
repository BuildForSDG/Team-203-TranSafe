import { Injectable } from '@angular/core';

import { auth } from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';
import { Plugins } from '@capacitor/core';
const { Geolocation } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class UserSpeedingService {

  constructor(
    private firestore: AngularFirestore
  ) {}

  async getCurrentPosition() {
    const coordinates = await Geolocation.getCurrentPosition();
    console.log('Current', coordinates);
  }

  watchPosition() {
    const wait = Geolocation.watchPosition({}, (position, err) => {
      const user = auth().currentUser;
      // console.log(user);
      if (user) {
        const speeding = {
          accuracy: position.coords.accuracy,
          altitude: position.coords.altitude,
          altitudeAccuracy: position.coords.altitudeAccuracy,
          heading: position.coords.heading,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          speed: position.coords.speed,
          timestamp: position.timestamp
        }
        console.log(speeding);
        this.firestore.collection('speeding').doc(`${speeding.timestamp}`).set(speeding);
      }
    })
  }
}
