import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule, FirestoreSettingsToken  } from '@angular/fire/firestore';
import { AngularFireStorageModule, BUCKET } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireAnalyticsModule} from '@angular/fire/analytics';
import {RouterModule} from '@angular/router';


import {FirebaseUIModule, firebase, firebaseui} from 'firebaseui-angular';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import { GoogleMapsModule } from '@angular/google-maps';
import { AppUpdateService } from './services/app-update.service';
import { NativeGeocoder, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';

const firebaseUiAuthConfig: firebaseui.auth.Config = {
  signInFlow: 'popup',
  signInOptions: [
    firebase.auth.PhoneAuthProvider.PROVIDER_ID
  ],
  tosUrl: '<your-tos-link>',
  privacyPolicyUrl: '<your-privacyPolicyUrl-link>',
  credentialHelper: firebaseui.auth.CredentialHelper.ACCOUNT_CHOOSER_COM
};



@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule,
           RouterModule,
           IonicModule.forRoot(),
           AppRoutingModule,
           AngularFireModule.initializeApp(environment.firebase),
           AngularFireAuthModule,
           AngularFirestoreModule,
           AngularFireStorageModule,
           AngularFireAnalyticsModule,
           FirebaseUIModule.forRoot(firebaseUiAuthConfig),
           ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
           GoogleMapsModule
        ],
  providers: [
    StatusBar,
    SplashScreen,
    NativeGeocoder,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: FirestoreSettingsToken, useValue: {}},
    { provide: AppUpdateService},
    { provide: BUCKET, useValue: 'gs://team-203-transafe.appspot.com' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
