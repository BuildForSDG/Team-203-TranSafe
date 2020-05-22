import { Component, OnInit } from '@angular/core';
import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

  slideOpts = {
    initialSlide: 0,
    speed: 400
  };

  constructor() { }






  ngOnInit() {
  }


  async tosignup() {
    console.log('hello');
    (await Storage.set({ key: 'welcomeCompleted', value: 'welcomed' }));

  }

}
