import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homenav',
  templateUrl: './homenav.page.html',
  styleUrls: ['./homenav.page.scss'],
})
export class HomenavPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {

    this.router.navigateByUrl('homenav/home');
  }

}
