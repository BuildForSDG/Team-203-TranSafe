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
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireAnalyticsModule} from '@angular/fire/analytics';
import { environment } from 'src/environments/environment';
import {RouterModule} from '@angular/router';


import {FirebaseUIModule, firebase, firebaseui} from 'firebaseui-angular';


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
           FirebaseUIModule.forRoot(firebaseUiAuthConfig)
        ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: FirestoreSettingsToken, useValue: {}},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
