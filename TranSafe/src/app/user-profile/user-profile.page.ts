import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ProfilePage } from '../modal/profile/profile.page';

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

   public name  = 'ian';
   public phone = '0549';
   public email = 'ian@gmail';
   public bio = 'Iam Good';
   public imgurl = 'https://google.com';

  constructor(private modalController: ModalController) { }

  ngOnInit() {
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

}
