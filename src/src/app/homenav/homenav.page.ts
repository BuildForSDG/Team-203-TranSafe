import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;
@Component({
  selector: 'app-homenav',
  templateUrl: './homenav.page.html',
  styleUrls: ['./homenav.page.scss'],
})
export class HomenavPage implements OnInit {

  // notif;
  constructor(private router: Router) { }

  async ngOnInit() {

    this.router.navigateByUrl('homenav/home');

    // const isnotification =  (await Storage.get({ key: 'notify' })).value;


  }


}
