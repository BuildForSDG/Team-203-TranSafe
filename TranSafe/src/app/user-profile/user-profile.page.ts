import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ProfilePage } from '../modal/profile/profile.page';
import { FirebaseAuthenticationService } from '../services/firebase-authentication.service';
import { AngularFireAuth } from '@angular/fire/auth';


export interface RefData {
  phoneNumber: string;
  displayName: string;
  photoURL: string;
  bio: string;
  email: string;
  uid: string;
}



@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})




export class UserProfilePage implements OnInit {


  public pdata = {
    name: 'Ian',
    url: '',
    phone: '0549931199',
    email: 'ian@gmail.com',
    bio: 'this isnt me'
  };

   public name  = '';
   public phone = '';
   public email = '';
   public bio = '';
   public imgurl = '';

  constructor(private modalController: ModalController,
              private authService: FirebaseAuthenticationService,
              private auth0: AngularFireAuth) { }

  ngOnInit() {
    this.auth0.user.subscribe(user => {
      this.getData(user.uid);

     } );


  }


  async openModal() {

    const modal = await this.modalController.create({
      component: ProfilePage
    });
    return await modal.present();
  }


  async openModalWithData() {

    const modal = await this.modalController.create({
      component: ProfilePage,
      componentProps: {
         name: this.name,
         phone: this.phone,
         email: this.email,
         bio: this.bio,
         imgurl: this.imgurl
      }
    });

    modal.onWillDismiss().then(dataReturned => {
      console.log('Recieve: ', this.pdata);
    });

    return await modal.present().then(_ => {
      console.log('Sending: ', this.pdata);
    });
  }


  getData(uuid: string) {


    this.authService
    .getUserdata(uuid)
    .subscribe(md => {
      const docdata = md.payload.data() as RefData;

      if (docdata.phoneNumber != null) {
        this.name  = docdata.displayName;
        this.phone = docdata.phoneNumber;
        this.email = docdata.email;
        this.bio = docdata.bio;
        this.imgurl = docdata.photoURL;
        console.log(this.phone);
      }
    });


  }

}
