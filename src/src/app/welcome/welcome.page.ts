import { Component, OnInit, ViewChild } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { Router } from '@angular/router';

import { IonSlides } from '@ionic/angular';

const { Storage } = Plugins;

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

  @ViewChild(IonSlides)
  slides: IonSlides;

  slideOpts = {
    initialSlide: 0,
    speed: 400
  };

  constructor( private router: Router) { }







  ngOnInit() {
  }


  async tosignup() {

    (await Storage.set({ key: 'welcomeCompleted', value: 'welcomed' }));
    this.router.navigateByUrl('signup');
  }


  getStarted() {
    this.slides.slideNext();
  }

}
