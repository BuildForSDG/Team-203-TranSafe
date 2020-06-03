import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ProfilePage } from '../modal/profile/profile.page';
import { FirebaseAuthenticationService } from '../services/firebase-authentication.service';


export interface RefData {
  phoneNumber: string;
  displayName: string;
  photoURL: string;
  bio: string;
  email: string;
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

  constructor(private modalController: ModalController, private authService: FirebaseAuthenticationService) { }

  ngOnInit() {
    this.getData();
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


  getData() {
    this.authService
    .getUserdata().
    subscribe(user => {

       const data = user.payload.data() as RefData;
       this.name  = data.displayName;
       this.phone = data.phoneNumber;
       this.email = data.email;
       this.bio = data.bio;
       this.imgurl = data.photoURL;
    });
  }

}
