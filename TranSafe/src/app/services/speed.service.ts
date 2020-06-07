import { Injectable, ViewChild, ElementRef, NgZone } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

import { Observable, range } from 'rxjs';
import { map } from 'rxjs/operators';

const { Geolocation } = Plugins;
import { NativeGeocoder, NativeGeocoderOptions, NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';
import { Platform, IonDatetime } from '@ionic/angular';
import { SpeedData } from '../home/home.page';
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
 dayStatsCollection: AngularFirestoreCollection<any>;
 weekStatsCollection: AngularFirestoreCollection<any>;
 monthStatsCollection: AngularFirestoreCollection<any>;
 getDayStats: Observable<any>;
 getWeekStats: Observable<any>;
 getMonthStats: Observable<any>;
 getOtherLocationCollection: AngularFirestoreCollection<any>;
 OtherCOllection: Observable<any>;

  isTracking = false;
  watch: string;

  constructor(public zone: NgZone,
              private afAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private nativeGeocoder: NativeGeocoder,
              private platform: Platform) { }

  initTrackUser() {

    this.afAuth.user.subscribe(user => {
    // Set all the user track collection


      this.locationsCollection = this.afs.collection(
        `speed/${user.uid}/track`,
        ref => ref.orderBy('timestamp', 'desc').limit(1)
      );

      this.getOtherLocationCollection = this.afs.collection(
        `speed/${user.uid}/track`,
        ref => ref.orderBy('timestamp', 'desc')
      );

      this.dayStatsCollection = this.afs.collection(
        `speed/${user.uid}/track`,
        ref => ref.orderBy('timestamp', 'desc').where('timestamp', '>', Math.floor(Date.now() / 1000)).limit(5)
      );


      const weekdate = new Date();
      const weekDay = new Date(weekdate.getFullYear(), weekdate.getMonth(), 7 - weekdate.getDay());
      this.weekStatsCollection = this.afs.collection(
        `speed/${user.uid}/track`,
        ref => ref.orderBy('timestamp', 'desc')
        .where('timestamp', '>', Math.floor(weekDay.getTime() / 1000))
        .limit(5)
      );



      const monthdate = new Date();
      const firstDay = new Date(monthdate.getFullYear(), monthdate.getMonth(), 1);
      const lastDay = new Date(monthdate.getFullYear(), monthdate.getMonth() + 1, 0);
      this.monthStatsCollection = this.afs.collection(
        `speed/${user.uid}/track`,
        ref => ref.orderBy('timestamp', 'desc')
        .where('timestamp', '>', Math.floor(firstDay.getTime() / 1000))
        .where('timestamp', '<', Math.floor(lastDay.getTime() / 1000))
        .limit(5)
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


    this.getDayStats = this.dayStatsCollection
      .snapshotChanges()
      .pipe(map(actions =>
          actions.map(a => {

            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        ));

    this.getWeekStats = this.weekStatsCollection
        .snapshotChanges()
        .pipe(map(actions =>
            actions.map(a => {

              const data = a.payload.doc.data();
              const id = a.payload.doc.id;
              return { id, ...data };
            })
          ));



    this.getMonthStats = this.monthStatsCollection
          .snapshotChanges()
          .pipe(map(actions =>
              actions.map(a => {

                const data = a.payload.doc.data();
                const id = a.payload.doc.id;
                return { id, ...data };
              })
            ));


    let safety: string;
    let risk: number;
    let speedLimitJumpCnt = 0;
    let totalSpeedVals = 0;

    this.OtherCOllection =   this.getOtherLocationCollection
   .snapshotChanges()
   .pipe(map(actions =>

     actions.map(a => {

       const data = a.payload.doc.data();
       const id = a.payload.doc.id;
       if (a.payload.doc.exists) {
         const isSpeedover = data.overSpeed;
         speedLimitJumpCnt = (isSpeedover) ? speedLimitJumpCnt + 1 : speedLimitJumpCnt;

       }

       totalSpeedVals += 1;


       risk = (speedLimitJumpCnt / totalSpeedVals) * 100;

       // Get safey status
       safety = this.getRiskSafetyStatus(risk);
       const docLenth = actions.length;
       return  {risk, speedLimitJumpCnt, safety, totalSpeedVals, docLenth};


     })


   ));



  }

startTracking(isdriving, vehicleNumber) {
    this.isTracking = true;
    this.watch = Geolocation.watchPosition({}, (position, err) => {
      if (position) {
        this.addNewLocation(
          vehicleNumber,
          isdriving,
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

getOtherDataRealTime() {
  return this.OtherCOllection;
}


getStatsData(type) {

     // get data from server and feed to chart depending on display type
    switch (type) {
      case 'day': {
        return this.getDayStats;
        break;
      }
      case 'week': {
        return this.getWeekStats;
        break;
      }
      case 'month': {
        return this.getMonthStats;
        break;
      }
      default: {
         break;
      }
   }

}


async getSpeedMetrics() {
  return this.OtherCOllection;
}


  // Save a new location to Firebase and center the map
async addNewLocation(vehicleNumber, isdriving, lat, lng, timestamp, speed, heading) {
  // get the location type and compare to speed limits



  const getName = await this.reverseGeocode(lat, lng);
  // check against speed limit

  const speedLimit = this.searchRoadType(getName);

  const convSpeed = (speed * 18) / 5;
  const overSpeed = (speedLimit < convSpeed) ? true : false ;



  this.locationsCollection.add({
    vehicleNumber,
    isdriving,
    lat,
    lng,
    timestamp,
    convSpeed,
    heading,
    speedLimit,
    overSpeed
  });



}




getRiskSafetyStatus(riskLevel): string {

      if (riskLevel < 10) {
        return 'SAFEST';

      } else if (riskLevel <= 20) {
        return 'SAFER';

      } else if (riskLevel <= 30 ) {
        return 'SAFE';

      } else if (riskLevel <= 40 ) {
        return 'LESS SAFE';

      } else if (riskLevel <= 50 ) {
        return 'UNSAFE';

      } else if (riskLevel <= 60 ) {
        return 'VERY UNSAFE';

      } else if (riskLevel <= 70 ) {
        return 'DANGEROUS';

      } else if (riskLevel <= 100 ) {
        return 'FATAL';
      }

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
  async reverseGeocode(lat, lng) {

  if (this.platform.is('cordova')) {
    const options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5
    };
    this.nativeGeocoder.reverseGeocode(lat, lng, options)
      .then((result: NativeGeocoderResult[]) => {

        this.userCity = result[0].areasOfInterest;
      })
      .catch((error: any) => console.log(error));
  } else {
    this.userCity =  await this.getGeoLocation(lat, lng, 'reverseGeocode');
  }


  return this.userCity ;
}




async getGeoLocation(lat: number, lng: number, type?) {

  let nname;
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
            nname = result.formatted_address;

            if (type === 'reverseGeocode') {

              this.latLngResult = result.formatted_address;

              nname = result.formatted_address;
            }
          }
        });
      }
    });
  }


  return this.latLngResult;
}



searchRoadType(inputName: string): number {
 const  pattern = [];
 let result;
 // tslint:disable-next-line:forin
 for ( let i = 0; i < 17; i++ ) {
    pattern.push('N' + i);
  }

 pattern.map( pt => {

 if (String(inputName).includes(pt)) {
    result = 100;
    } else {
      result = 40;
    }

    });


 return result;

}



}
