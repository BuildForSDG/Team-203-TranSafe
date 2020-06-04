import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { MenuController } from '@ionic/angular';

import { UserSpeedingService } from './services/user-speeding.service';
import { FirebaseAuthenticationService } from './services/firebase-authentication.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { RefData } from './user-profile/user-profile.page';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  public name  = '';
  public email = '';
  public imgurl = '';

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private menuCtrl: MenuController,
    private userSpeeding: UserSpeedingService,
    private authService: FirebaseAuthenticationService,
    private auth0: AngularFireAuth
  ) {
    this.initializeApp();
    this.userSpeeding.watchPosition();
  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnInit() {

    this.auth0.user.subscribe(user => {

      this.authService
      .getUserdata(user.uid)
      .subscribe(md => {
        const docdata = md.payload.data() as RefData;
        if (docdata.phoneNumber != null) {
          this.name  = docdata.displayName;
          this.email = docdata.email;
          if (docdata.photoURL != null) {
            this.imgurl = docdata.photoURL;
          } else {
            this.imgurl = '../assets/images/avatar.jpg';
          }

        }
      });
     } );

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  toggleMenu() {
    this.menuCtrl.close('main-menu');
  }

}
