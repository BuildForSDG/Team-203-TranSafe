import { Component, OnInit } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { Router } from '@angular/router';

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

  constructor( private router: Router) { }







  ngOnInit() {
  }


  async tosignup() {

    (await Storage.set({ key: 'welcomeCompleted', value: 'welcomed' }));
    this.router.navigateByUrl('signup');
  }

}
