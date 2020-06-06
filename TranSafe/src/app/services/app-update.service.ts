import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AppUpdateService {
constructor(private readonly updates: SwUpdate, public alertController: AlertController) {
  this.updates.available.subscribe(event => {
    this.showAppUpdateAlert();
  });
}
async showAppUpdateAlert() {
  const header = 'App Update available';
  const message = 'Choose Ok to update';
  const caller = this;
  // Use MatDialog or ionicframework's AlertController or similar

  const alert = await this.alertController.create({
    header,
    message,
    buttons: [{text: 'OK',
              handler: () => {
                this.doAppUpdate();
              }
          }],
  });

  await alert.present();


}

doAppUpdate() {
    this.updates.activateUpdate().then(() => document.location.reload());
  }
}
