import {  Component, OnInit, ViewChild  } from '@angular/core';
import { SpeedService } from '../services/speed.service';



@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit {




  constructor(private speedService: SpeedService) {

  }





  ngOnInit() {
    if (this.speedService.isTracking) {
    // this.speedService.initTrackUser();

    }

  }




}
