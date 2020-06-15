import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SpeedService } from 'src/app/services/speed.service';
import { Observable } from 'rxjs';
import { GaugeChartComponent } from 'angular-gauge-chart';
import { AlertController } from '@ionic/angular';
import { Toast } from '@capacitor/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

export interface SpeedData {
  convSpeed: number;
  heading?: number;
  id: string;
  lat: number;
  lng: number;
  overSpeed: boolean;
  speedLimit: number;
  timestamp: string;
  isdriving: boolean;
  risk: number;
  speedLimitJumpCnt: number;
  safety: string;

}

export interface HomeSummary {
  Rating: string;
  RiskLevel: number;
  Status: string;
  OverSpeedFreq: string;

}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  userDocs: Observable<any>;


  @ViewChild(GaugeChartComponent)
  guage: GaugeChartComponent;


  isDriving;
  updateBtnText = 'Track';
  isBeginTrack = false;
  speedlmt = 0;
  safety = 'SAFEST';
  risk = 0;
  numOverSpeed = 0;
  speedval = 0;


public canvasWidth = 300;
public needleValue = 0;
public centralLabel = '';
public options = {
    hasNeedle: true,
    needleColor: '#5e5e5e',
    needleUpdateSpeed: 1000,
    arcColors: ['lightgray', '#5F4591' ],
    arcDelimiters: [70],
    rangeLabel: ['0 km/hr', '170 km/hr'],
    needleStartValue: 0,
    rangeLabelFontSize: 13,
};

  constructor(public speedService: SpeedService,
              public alertController: AlertController,
              private afAuth: AngularFireAuth,
              private router: Router) {}



ngOnInit() {


   this.afAuth.user.subscribe(user => {
      if (!user) {
        this.GoLogin();
      }
  });
   this.speedService.initTrackUser();

}

async GoLogin() {
  const alert = await this.alertController.create({
    cssClass: 'my-custom-class',
    header: 'Sign Up',
    message: '<ion-grid>\
              <ion-row><ion-col><ion-text>You have to sign up to be able to use the app.\
               <strong>Click on Sign Up to proceed</strong></ion-text>\ ',
    buttons: [
      {
        text: 'Sign Up',
        handler: () => {
          this.router.navigateByUrl('signup');

        }
      }
    ]
  });

  await alert.present();

}

async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Start Tracking',
      message: '<ion-grid>\
                <ion-row><ion-col><ion-text>You are about to <strong>initiate tracking</strong></ion-text>\
                <ion-text>. Are You Driving <ion-icon name="car-sharp"></ion-icon>\
                 or Boarding <ion-icon name="man-sharp"></ion-icon>? Choose your option below</ion-text></ion-col></ion-row>\
                 </ion-grid> ',
      inputs: [{
                name: 'vhplatenumber',
                type: 'text',
                placeholder: 'Enter Vehicle Plate Number'
              }],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (data) => {
            this.isBeginTrack = false;
            this.updateBtnText = 'Track';
          }
        },
        {
          text: 'Boarding, Begin Tracking',
          handler: (data) => {
            const inputData = data.vhplatenumber;
            this.isBeginTrack = true;
            this.Track('boarding', inputData);
            this.updateBtnText = 'Stop';

          }
        }
        , {
          text: 'Driving, Begin Tracking',
          handler: (data) => {

            const inputData = data.vhplatenumber;
            this.isBeginTrack = true;
            this.Track('driving', inputData);
            this.updateBtnText = 'Stop';

          }
        }
      ]
    });

    await alert.present();
  }

segmentChanged(event) {

    this.isDriving = event.detail.value;

  }





async Track(status, inputData) {
  const isdrive = (status === 'driving') ? true : false;
  this.speedService.startTracking(isdrive, inputData);
  this.speedService.initTrackUser();



  // get speed value and update
  this.speedService.getDataRealTime()
  .subscribe(location => {
    const getData = location[0] as SpeedData;
    console.log(getData);

    this.guage.needleValue = getData.convSpeed;
    this.speedval = getData.convSpeed;
    this.speedlmt = getData.speedLimit;
    this.guage.drawChart(true);




  });


  // speed metrics
  this.speedService.getOtherDataRealTime().subscribe( getd => {



    this.safety = getd[0].safety;
    this.risk = getd[0].risk;
    this.numOverSpeed = getd[0].speedLimitJumpCnt;

  });

}


  async startTrackUser() {

    if (this.updateBtnText === 'Track') {
      this.presentAlertConfirm();

    } else {
      if ( this.speedService.isTracking) {
        this.speedService.stopTracking();
      }
      this.updateBtnText = 'Track';

      this.showToast('Tracking Stopped');

    }

  }


  async showToast(message) {

    await Toast.show({
      text: message
    });
  }



  // Compute user risk level:(number of speedlimit jumb/number of speedlimit)

// computeUserRiskLevel(){

//   let cntOverSpeed = 0
//   let cntSpeed = 0;
//   let riskLevel=0;

//   this.userDocs.forEach(doc=>{

//     const data = doc.data();

//     if(data.overSpeed){
//       cntOverSpeed = cntOverSpeed + 1;

//     }

//     cntSpeed= cntSpeed + 1;

//   });

//  return   riskLevel = (cntOverSpeed /cntSpeed)*100;

// }

// getCountOfOverSpeeding () {

//   let cntOverSpeed = 0

//   this.userDocs.forEach(doc=>{

//     const data = doc.data();

//     if(data.overSpeed){
//       cntOverSpeed = cntOverSpeed + 1;

//     }

//   });

//  return  cntOverSpeed ;

// }

// //Get count of speed records
//     getCountOfSpeed () {

//       let cntSpeed = 0

//       this.userDocs.forEach(doc=>{

//         cntSpeed = cntSpeed + 1;

//       });

//     return  cntSpeed ;

//     }


//     //compute risk level
//     computerRiskLevel(){
//       let cntOverSpeed = this.getCountOfOverSpeeding();
//       let cntSpeed = this.getCountOfSpeed()
//       let riskLevel = (cntOverSpeed/cntSpeed)*100;
//       return riskLevel;
//     }

//     //Get safey status
//     getRiskSafetyStatus(riskLevel){
//       let safetyStatus="";
//       if(riskLevel<10){
//         safetyStatus ="SAFEST"

//       }else if(riskLevel<=20){
//         safetyStatus="SAFER";

//       }else if(riskLevel<=30){
//         safetyStatus="SAFE";

//       }else if(riskLevel<=40){
//         safetyStatus="LESS SAFE"

//       }else if(riskLevel<=50){
//         safetyStatus="UNSAFE";

//       }else if (riskLevel<=60){
//         safetyStatus ="VERY UNSAFE";

//       }else if (riskLevel<=70){
//         safetyStatus ="DANGEROUS";

//       }else if (riskLevel<=100){
//         safetyStatus="FATAL";
//       }

//       return safetyStatus;

//     }

//     getHomePageInfo(): HomeSummary {
//       const riskLevel =this.computeUserRiskLevel();
//       const cntOverSpeed = this.getCountOfOverSpeeding();
//       const cntSpeed = this.getCountOfSpeed();
//       const status = this.getRiskSafetyStatus(riskLevel);
//       return {

//           Rating:"3",
//           RiskLevel:riskLevel,
//           Status: status,
//           OverSpeedFreq: `${cntOverSpeed}/${cntSpeed}`

//       };

//     }



}

